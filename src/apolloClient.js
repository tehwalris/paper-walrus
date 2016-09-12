import ApolloClient, {createNetworkInterface} from 'apollo-client';

function dataIdFromObject({__typename: type, id}) {
  if (_.isString(type) && !_.isNil(id))
    return `${type}:${id}`;
  return null;
}

export const reducerConfig = {dataIdFromObject};

function networkInterfaceFromStore(store) {
  const networkInterface = createNetworkInterface({uri: '/graphql'});
  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers)
        req.options.headers = {};
      req.options.headers['x-access-token'] = store.getState().user.token;
      next();
    },
  }]);
  return networkInterface;
}

export function apolloClientFromStore(store) {
  const client = new ApolloClient({
    networkInterface: networkInterfaceFromStore(store),
  });
  client.setStore(store); // HACK
  return client;
}
