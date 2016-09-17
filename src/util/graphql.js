import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

export function multiWrapApollo(InnerComponent, parts) {
  return _.reduce(
    parts,
    (PreviousComponent, part) => graphql(...part)(PreviousComponent),
    InnerComponent
  );
}

export function idBlockFromPropTypes(PropTypes) {
  return {
    id: PropTypes.string.isRequired,
    __typename: PropTypes.string.isRequired,
  };
}

function innerFieldsToString(innerFields) {
  if(_.isNil(innerFields))
    return '';
  if(_.isString(innerFields))
    return innerFields;
  if(_.isFunction(innerFields.toGraphql))
    return innerFields.toGraphql();
  throw new Error('Incompatible field type.');
}

function getTopLevelFieldString(name, innerFields, variableTypes) {
  let argumentNamesString = _.map(variableTypes, (type, name) => `${name}: $${name}`).join(', ');
  argumentNamesString = argumentNamesString && `(${argumentNamesString})`;
  let innerFieldString = innerFieldsToString(innerFields);
  innerFieldString = innerFieldString && `{${innerFieldString}}`;
  return `${name} ${argumentNamesString} ${innerFieldString}`;
}

function simpleOperation(operationType, fields, variableTypes, operationName = '') {
  let variableTypesString = _.map(variableTypes, (type, name) => `$${name}: ${type}`).join(', ');
  variableTypesString = variableTypesString && `(${variableTypesString})`;
  return gql`
    ${operationType} ${operationName} ${variableTypesString} {
      ${_.map(fields, (innerFields, name) => getTopLevelFieldString(name, innerFields, variableTypes)).join(', ')}
    }
  `;
}

export const simpleQuery = simpleOperation.bind(null, 'query');
export const simpleMutation = simpleOperation.bind(null, 'mutation');
