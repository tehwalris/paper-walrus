import Relay from 'react-relay';
import {VIEWER_ID} from 'paper-walrus-server/src/constants';

export default class DeleteDocumentPartMutation extends Relay.Mutation {
  static fragments = {
    part: () => Relay.QL`
      fragment on DocumentPart {
        id,
        document { id }
      }
    `,
  }
  getMutation = () => Relay.QL`
    mutation { deleteDocumentPart }
  `
  getFatQuery = () => Relay.QL`
    fragment on DeleteDocumentPartPayload {
      documentPart
      document {
        parts
      }
      viewer {
        sourceFiles
      }
    }
  `
  getVariables() {
    return {id: this.props.part.id};
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: VIEWER_ID,
        document: this.props.part.document.id,
      },
    }];
  }
}
