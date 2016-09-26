import Relay from 'react-relay';
import {VIEWER_ID} from 'paper-walrus-server/src/constants';

export default class CreateDocumentMutation extends Relay.Mutation {
  getMutation = () => Relay.QL`
    mutation { createDocument }
  `
  getFatQuery = () => Relay.QL`
    fragment on CreateDocumentPayload {
      viewer {
        documents
      }
    }
  `
  getVariables() {
    return {document: {visibility: 'standalone'}};
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {viewer: VIEWER_ID},
    }];
  }
}



