const querystring = require('querystring');

export default class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  authenticate(options) {
    return this._apiCall('POST', '/authenticate', this._jsonBody(options)).then(res => res.token);
  }

  _apiCall(method, endpoint, options = {}, token) {
    let fullUrl = this._baseUrl + endpoint;
    if (options.query)
      fullUrl += '?' + querystring.stringify(_.mapValues(options.query, JSON.stringify));
    const headers = options.headers || new Headers();
    if (token)
      headers.set('x-access-token', token);
    return fetch(fullUrl, {
      cache: 'no-store',
      method,
      headers,
      ..._.omit(options, ['query', 'responseType', 'headers']),
    }).then(res => {
      if (res.ok)
        return options.responseType === 'none' ? undefined : res.json();
      return res.text().then(e => Promise.reject(e));
    });
  }

  _jsonBody(sourceObject) {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    return {
      body: JSON.stringify(sourceObject),
      headers,
    };
  }
}
