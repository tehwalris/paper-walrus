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

export function simpleQuery(name, variableTypes, fields) {
  return gql`
    query(${_.map(variableTypes, (type, name) => `$${name}: ${type}`).join(', ')}) {
      ${name}(${_.map(variableTypes, (type, name) => `${name}: $${name}`).join(', ')}) {
        ${_.isFunction(fields.toGraphql) ? fields.toGraphql() : fields}
      }
    }
  `;
}
