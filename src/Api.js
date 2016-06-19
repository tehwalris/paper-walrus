const querystring = require('querystring');

export default class Api {
  constructor (baseUrl) {
    this._baseUrl = baseUrl;
  }

  getTags() {
    return this._apiCall('GET', '/tags').then(res => res.tags);
  }

  getEntries(options) {
    return this._apiCall('GET', '/entries', {query: options}).then(res => res.entries);
  }

  //TODO
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
    if(options.query)
      endpoint += '?' + querystring.stringify(_.mapValues(options.query, JSON.stringify));
    delete options.query;
    return fetch(this._baseUrl + endpoint, {
      cache: 'no-store',
      method,
      ...options,
    }).then(res => res.json());
  }
}
