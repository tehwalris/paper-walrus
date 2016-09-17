import Relay from 'react-relay';

const defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'login': { //HACK HACK HACK :'(
      Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer('/graphql', {
        headers: {
          'x-access-token': action.token,
        },
      }));
      return {...state, ..._.pick(action, ['email', 'token'])};
    }
    case 'reset':
      return defaultState;
    default:
      return state;
  }
}
