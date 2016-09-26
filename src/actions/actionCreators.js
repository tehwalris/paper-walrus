import Api from '../Api';
import {apiBaseUrl} from '../util/apiConfig';
import {history} from '../common';

const api = new Api(apiBaseUrl);

const getToken = state => state.user.token;

export function uploadSourceFiles(files, cb) {
  // cb(err)
  return (dispatch, getState) => {
    const token = getToken(getState());
    api.uploadSourceFiles(files, token)
      .then(() => cb(null))
      .catch(cb);
  };
}

export function login(options, cb) {
  return (dispatch) => {
    api.authenticate(options).then(token => {
      dispatch({type: 'reset'});
      dispatch({
        type: 'login',
        email: options.email,
        token,
      });
      cb();
    }).catch(err => cb(err));
  };
}

export function logout() {
  history.push('/login');
  return {type: 'reset'};
}
