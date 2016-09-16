import {PropTypes as ReactPropTypes} from 'react';

const secret = {};

function addIsRequiredToPlaceholder(placeholder) {
  placeholder.isRequired = {
    ...placeholder,
    isRequired: true,
  };
  return placeholder;
}

function wrapSimplePropType(name) {
  return addIsRequiredToPlaceholder({
    reactTypeName: name,
    simpleType: true,
    secret,
  });
}

function wrapShapePropType() {
  return function(fieldTypes) {
    return addIsRequiredToPlaceholder({
      reactTypeName: 'shape',
      fieldTypes,
      secret,
    });
  };
}

function wrapArrayOfPropType() {
  return function(childType) {
    return addIsRequiredToPlaceholder({
      reactTypeName: 'arrayOf',
      childType,
      secret,
    });
  }
}

const WrappedPropTypes = {
  string: wrapSimplePropType('string'),
  number: wrapSimplePropType('number'),
  bool: wrapSimplePropType('bool'),
  func: wrapSimplePropType('func'),
  shape: wrapShapePropType(),
  arrayOf: wrapArrayOfPropType(),
};

function isConvertablePropTypeEntry(entry) {
  return entry.secret === secret;
}

function maybeWrapTopLevel(structure) {
  if(isConvertablePropTypeEntry(structure))
    return structure;
  return WrappedPropTypes.shape(structure);
}

function mapDeep(entry, cb) {
  if(!isConvertablePropTypeEntry(entry))
    throw new Error('Every element of ConvertablePropTypes must be a ConvertablePropType');
  if(entry.reactTypeName === 'arrayOf')
    return cb({...entry, childType: cb(entry.childType)});
  if(entry.reactTypeName === 'shape')
    return cb({...entry, fieldTypes: _.mapValues(entry.fieldTypes, cb)});
  return cb(entry);
}

function cleanEntry(entry) {
  return {
    ...entry,
    isRequired: entry.isRequired === true,
  };
}

function nameTreeEntryToGraphql(entry, name) {
  if(_.isObject(entry))
    return `${name} {${_.map(entry, nameTreeEntryToGraphql).join(', ')}}`;
  if(_.isNull(entry))
    return name;
  throw new Error('Graphql mapping failed.');
}

function toNameTree(entry) {
  if(entry.reactTypeName === 'arrayOf')
    return toNameTree(entry.childType);
  if(entry.reactTypeName === 'shape')
    return _.mapValues(entry.fieldTypes, toNameTree);
  return null;
}

function toGraphql(entry) {
  const nameTree = toNameTree(entry);
  mapDeep(entry, entry => {
    if(entry.reactTypeName === 'arrayOf' && entry.childType.reactTypeName !== 'shape')
      throw new Error('PropTypes.arrayOf must contain PropTypes.shape when mapping to graphql.');
  });
  return _.map(nameTree, nameTreeEntryToGraphql).join(', ');
}

function toReact(entry) {
  let propType = ReactPropTypes[entry.reactTypeName];
  if(entry.reactTypeName === 'arrayOf')
    propType = propType(toReact(entry.childType));
  if(entry.reactTypeName === 'shape')
    propType = propType(_.mapValues(entry.fieldTypes, fieldEntry => toReact(fieldEntry)));
  if(entry.isRequired)
    propType = propType.isRequired;
  return propType;
}

export default function(builderFunction) {
  const dirtyStructure = maybeWrapTopLevel(builderFunction(WrappedPropTypes));
  const cleanStructure = mapDeep(dirtyStructure, cleanEntry);
  return {
    toStructure: () => cleanStructure,
    toNameTree: () => toNameTree(cleanStructure),
    toGraphql: () => toGraphql(cleanStructure),
    toReact: () => toReact(cleanStructure),
  };
}
