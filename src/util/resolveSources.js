import {contentBaseUrl} from '../util/apiConfig';

export default function resolveSources (data) {
  return {
    original: contentBaseUrl + '/' + data.originalFile,
    preview: data.previewFile ? contentBaseUrl + '/' + data.previewFile : null,
  };
}
