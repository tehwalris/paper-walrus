import {history, api} from '../common';

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
    api.authenticate(options).then(tokens => {
      dispatch({type: 'reset'});
      dispatch({
        type: 'login',
        email: options.email,
        ...tokens,
      });
      cb();
    }).catch(err => cb(err));
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({type: 'reset'});
    history.push('/login');
  }
}
