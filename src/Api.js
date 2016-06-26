const querystring = require('querystring');

export default class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  authenticate(options) {
    return this._apiCall('POST', '/authenticate', this._jsonBody(options)).then(res => res.token);
  }

  getTags(token) {
    return this._apiCall('GET', '/tags', undefined, token).then(res => res.tags);
  }

  createTag(options, token) {
    return this._apiCall('POST', '/tags', this._jsonBody(options), token);
  }

  getEntries(options, token) {
    return this._apiCall('GET', '/entries', {query: options}, token).then(res => res.entries);
  }

  getEntry({id}, token) {
    return this._apiCall('GET', `/entries/${id}`, undefined, token);
  }

  createEntry(options, token) {
    return this._apiCall('POST', '/entries', this._jsonBody(options), token);
  }

  updateEntry({id, ...options}, token) {
    return this._apiCall('POST', `/entries/${id}`, this._jsonBody(options), token);
  }

  deleteEntry({id}, token) {
    return this._apiCall('DELETE', `/entries/${id}`, {responseType: 'none'}, token);
  }

  createEntryData(files, onProgress, token) {
    const form = new FormData();
    files.forEach(file => form.append('files', file, file.name));
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.responseType = 'json';
      request.onprogress = onProgress;
      request.onreadystatechange = () => {
        if (request.readyState !== XMLHttpRequest.DONE)
          return;
        if (request.status === 200)
          resolve(request.response);
        else
          reject(new Error('Upload failed.'));
      };
      request.open('POST', this._baseUrl + '/entryData');
      request.setRequestHeader('x-access-token', token);
      request.send(form);
    }).then(res => res.data);
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
