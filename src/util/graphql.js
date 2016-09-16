import {graphql} from 'react-apollo';

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
