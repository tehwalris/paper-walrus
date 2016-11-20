import UploadSourceFilesMutation from '../mutations/UploadSourceFilesMutation';
import CreateSourceFileMutation from '../mutations/CreateSourceFileMutation';
import {zipWith} from 'lodash';

class SourceFileUpload {
  constructor({file, uploadTarget, relay}) {
    this._file = file;
    this._target = uploadTarget;
    this._relay = relay;
  }

  uploadAndCreate() {
    this._upload()
      .then(() => this._create());
  }

  _upload() {
    const form = new FormData();
    this._target.formData.forEach(({key, value}) => form.set(key, value));
    form.set('file', this._file);
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.responseType = 'json';
      request.onreadystatechange = () => {
        if (request.readyState !== XMLHttpRequest.DONE)
          return;
        if (request.status === 204)
          resolve();
        else
          reject(new Error('Raw file upload failed.'));
      };
      request.open('POST', this._target.postUrl);
      request.send(form);
    });
  }

  _create() {
    return new Promise((resolve, reject) => this._relay.commitUpdate(
      new CreateSourceFileMutation({key: this._target.key}),
      {
        onSuccess: () => resolve(),
        onFailure: transaction => reject(transaction.getError()),
      },
    ));
  }
}

class MultiSourceFileUpload {
  constructor({relay, files}) {
    this._relay = relay;
    this._files = files;
  }

  upload() {
    return this.getUploadTargets()
      .then(uploadTargets => this.uploadAllFiles(uploadTargets));
  }

  getUploadTargets() {
    return new Promise((resolve, reject) => this._relay.commitUpdate(
      new UploadSourceFilesMutation({files: this._files}),
      {
        onSuccess: response => resolve(response.uploadSourceFiles.uploadTargets),
        onFailure: transaction => reject(transaction.getError()),
      },
    ));
  }

  uploadAllFiles(uploadTargets) {
    return Promise.all(zipWith(this._files, uploadTargets, (file, uploadTarget) => {
      const singleUpload = new SourceFileUpload({file, uploadTarget, relay: this._relay});
      return singleUpload.uploadAndCreate();
    }));
  }
}

export default function uploadSourceFiles(options) {
  const uploads = new MultiSourceFileUpload(options);
  return uploads.upload();
}
