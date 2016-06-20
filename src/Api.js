const querystring = require('querystring');

export default class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  getTags() {
    return this._apiCall('GET', '/tags').then(res => res.tags);
  }

  getEntries(options) {
    return this._apiCall('GET', '/entries', {query: options}).then(res => res.entries);
  }

  getEntry({id}) {
    return this._apiCall('GET', `/entries/${id}`);
  }

  // TODO
  /*
  findItems(options) {
    return new Promise(resolve => {
      this._socket.emit('findItems', options, resolve);
    });
  }

  uploadImage(image, tagIds) {
    return new Promise((resolve, reject) => {
      this._socket.emit('upload', image, {tagIds}, (id) => {
        if(id)
          resolve(id);
        reject('Upload failed.');
      });
    });
  }
  */

  _apiCall(method, endpoint, options = {}) {
    let fullUrl = this._baseUrl + endpoint;
    if (options.query)
      fullUrl += '?' + querystring.stringify(_.mapValues(options.query, JSON.stringify));
    return fetch(fullUrl, {
      cache: 'no-store',
      method,
      ..._.omit(options, 'query'),
    }).then(res => {
      if (res.ok)
        return res.json();
      return res.text().then(e => Promise.reject(e));
    });
  }
}
