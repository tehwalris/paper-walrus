import {isFunction} from 'lodash'

class WrongTokenError extends Error {
  constructor(msg, res = {}) {
    super(msg);
    this.res = res;
    this.name = 'WrongTokenError';
  }
}

export default function authMiddleware(opts = {}) {
  const {
    token: tokenOrThunk,
    tokenRefreshPromise,
    allowEmptyToken = false,
    prefix = 'Bearer ',
    header = 'Authorization',
  } = opts;

  return next => req => {
    return new Promise((resolve, reject) => {
      const token = isFunction(tokenOrThunk) ? tokenOrThunk(req) : tokenOrThunk;
      if (!token && tokenRefreshPromise && !allowEmptyToken) {
        reject(new WrongTokenError('Token not provided, try fetch new one'));
      }
      resolve(token);
    }).then(token => {
      if (token) {
        req.headers[header] = `${prefix}${token}`;
      }
      return next(req);
    }).then(res => {
      if (res.status === 401 && tokenRefreshPromise) {
        throw new WrongTokenError('Received status 401 from server', res);
      }
      return res;
    }).catch(err => {
      if (err.name === 'WrongTokenError') {
        return tokenRefreshPromise(req, err.res)
          .then(newToken => {
            req.headers[header] = `${prefix}${newToken}`;
            return next(req); // re-run query with new token
          });
      }

      throw err;
    });
  };
}
