import Relay from 'react-relay';

export default class AddTagToDocumentMutation extends Relay.Mutation {
  static fragments = {
    document: () => Relay.QL`
      fragment on Document { id }
    `,
    tag: () => Relay.QL`
      fragment on Tag { id }
    `,
  }
  getMutation = () => Relay.QL`
    mutation { addTagToDocument }
  `
  getFatQuery = () => Relay.QL`
    fragment on AddTagToDocumentPayload {
      document {
       tags
     }
    }
  `
  getVariables() {
    const {document, tag} = this.props;
    return {documentId: document.id, tagId: tag.id};
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        document: this.props.document.id,
      },
    }];
  }
}
