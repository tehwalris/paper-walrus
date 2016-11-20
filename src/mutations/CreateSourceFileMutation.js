import Relay from 'react-relay';
import {VIEWER_ID} from 'paper-walrus-server/src/constants';

export default class CreateSourceFileMutation extends Relay.Mutation {
  getMutation = () => Relay.QL`
    mutation { createSourceFile }
  `
  getFatQuery = () => Relay.QL`
    fragment on CreateSourceFilePayload {
      viewer {
        sourceFiles
      }
    }
  `
  getVariables() {
    return {
      key: this.props.key,
    };
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {viewer: VIEWER_ID},
    }];
  }
}
