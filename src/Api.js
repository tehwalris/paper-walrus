const querystring = require('querystring');

export default class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  getTags() {
    return this._apiCall('GET', '/tags').then(res => res.tags);
  }

  createTag(options) {
    return this._apiCall('POST', '/tags', this._jsonBody(options));
  }

  getEntries(options) {
    return this._apiCall('GET', '/entries', {query: options}).then(res => res.entries);
  }

  getEntry({id}) {
    return this._apiCall('GET', `/entries/${id}`);
  }

  createEntry(options) {
    return this._apiCall('POST', '/entries', this._jsonBody(options));
  }

  updateEntry({id, ...options}) {
    return this._apiCall('POST', `/entries/${id}`, this._jsonBody(options));
  }

  deleteEntry({id}) {
    return this._apiCall('DELETE', `/entries/${id}`, {responseType: 'none'});
  }

  createEntryData(files, onProgress) {
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
      request.send(form);
    }).then(res => res.data);
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
      ..._.omit(options, ['query', 'responseType']),
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
