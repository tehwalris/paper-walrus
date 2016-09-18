import Relay from 'react-relay';
import {VIEWER_ID} from 'paper-walrus-server/src/constants';

export default class UploadSourceFilesMutation extends Relay.Mutation {
  getMutation = () => Relay.QL`
    mutation { uploadSourceFiles }
  `
  getFatQuery = () => Relay.QL`
    fragment on UploadSourceFilesPayload {
      viewer {
        sourceFiles
      }
    }
  `
  getVariables() {
    return {};
  }
  getFiles() {
    const files = {};
    this.props.files.forEach((file, i) => files[i] = file);
    return files;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {viewer: VIEWER_ID},
    }];
  }
}



