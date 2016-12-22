import Relay from 'react-relay';

const defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'login':
      return {...state, ..._.pick(action, ['email', 'token'])};
    case 'reset':
      return defaultState;
    default:
      return state;
  }
}
