import Relay from 'react-relay';
import {VIEWER_ID} from 'paper-walrus-server/src/constants';

export default class DeleteDocumentMutation extends Relay.Mutation {
  static fragments = {
    document: () => Relay.QL`
      fragment on Document { id }
    `,
  }
  getMutation = () => Relay.QL`
    mutation { deleteDocument }
  `
  getFatQuery = () => Relay.QL`
    fragment on DeleteDocumentPayload {
      viewer {
        documents
      }
    }
  `//TODO
  getVariables() {
    return {id: this.props.document.id};
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {viewer: VIEWER_ID},
    }];
  }
}


