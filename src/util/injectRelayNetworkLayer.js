import Relay from 'react-relay';
import {RelayNetworkLayer, urlMiddleware} from 'react-relay-network-layer';
import authMiddleware from './authMiddleware'
import {store, api} from '../common';
import {forceLogin} from './user';

async function refreshTokens() {
  try {
    const oldRefreshToken = store.getState().user.refreshToken;
    const tokens = await api.authenticateWithRefreshToken({refreshToken: oldRefreshToken});
    store.dispatch({ type: 'updateTokens', ...tokens });
    return tokens.token;
  } catch (e) {
    console.error(e);
    forceLogin();
  }
}

Relay.injectNetworkLayer(new RelayNetworkLayer(
  [
    urlMiddleware({
      url: () => '/graphql',
    }),
    authMiddleware({
      token: () => store.getState().user.token,
      tokenRefreshPromise: refreshTokens,
      prefix: '',
      header: 'x-access-token',
    }),
  ],
  {
    disableBatchQuery: true,
  },
));
