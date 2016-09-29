import Relay from 'react-relay';

export default class RemoveTagFromDocumentMutation extends Relay.Mutation {
  static fragments = {
    document: () => Relay.QL`
      fragment on Document { id }
    `,
    tag: () => Relay.QL`
      fragment on Tag { id }
    `,
  }
  getMutation = () => Relay.QL`
    mutation { removeTagFromDocument }
  `
  getFatQuery = () => Relay.QL`
    fragment on RemoveTagFromDocumentPayload {
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
