import {graphql} from 'react-apollo';

export function multiWrapApollo(InnerComponent, parts) {
  return _.reduce(
    parts,
    (PreviousComponent, part) => graphql(...part)(PreviousComponent),
    InnerComponent
  );
}
