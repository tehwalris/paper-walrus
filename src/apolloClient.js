import ApolloClient from 'apollo-client';

export default new ApolloClient({
  dataIdFromObject: ({__typename: type, id}) => {
    if (_.isString(type) && !_.isNil(id))
      return `${type}:${id}`;
    return null;
  },
});
