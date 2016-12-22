import Relay from 'react-relay';
import {RelayNetworkLayer, urlMiddleware} from 'react-relay-network-layer';
import authMiddleware from './authMiddleware'
import {store} from '../common';

Relay.injectNetworkLayer(new RelayNetworkLayer([
  urlMiddleware({
    url: () => '/graphql',
  }),
  authMiddleware({
    token: () => store.getState().user.token,
    prefix: '',
    header: 'x-access-token',
  }),
]));
