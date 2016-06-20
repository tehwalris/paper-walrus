import {contentBaseUrl} from '../util/apiConfig';

export default function resolveSources (data) {
  return {
    original: contentBaseUrl + '/' + data.originalFile,
    preview: contentBaseUrl + '/' + data.previewFile,
  };
}
