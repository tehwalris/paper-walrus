import Relay from 'react-relay';
import {getCurrentUser, setCurrentUser, clearCurrentUser} from '../util/user';

const defaultState = getCurrentUser() || {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'login':
      setCurrentUser(_.pick(action, ['email', 'token', 'refreshToken']));
      return {...state, ..._.pick(action, ['email', 'token', 'refreshToken'])};
    case 'updateTokens':
      setCurrentUser({email: state.email, ..._.pick(action, ['token', 'refreshToken'])});
      return {...state, ..._.pick(action, ['token', 'refreshToken'])};
    case 'reset':
      clearCurrentUser();
      return defaultState;
    default:
      return state;
  }
}
