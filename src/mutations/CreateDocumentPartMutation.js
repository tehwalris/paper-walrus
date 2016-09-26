import Relay from 'react-relay';
import {VIEWER_ID} from 'paper-walrus-server/src/constants';

export default class CreateDocumentPartMutation extends Relay.Mutation {
  static fragments = {
    document: () => Relay.QL`
      fragment on Document { id }
    `,
    sourceFile: () => Relay.QL`
      fragment on SourceFile { id }
    `,
  }
  getMutation = () => Relay.QL`
    mutation { createDocumentPart }
  `
  getFatQuery = () => Relay.QL`
    fragment on CreateDocumentPartPayload {
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
    return {documentPart: {
      documentId: this.props.document.id,
      sourceFileId: this.props.sourceFile.id, //TODO use object from fragment
    }};
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: VIEWER_ID,
        document: this.props.document.id,
      },
    }];
  }
}
