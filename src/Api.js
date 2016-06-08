import io from 'socket.io-client';

export default class Api {
  constructor (host, options) {
    this._socket = io.connect(host, options);
  }

  getAllTags() {
    return new Promise(resolve => {
      this._socket.emit('getAllTags', resolve);
    });
  }

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
}
