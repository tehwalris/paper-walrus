import Relay from 'react-relay';

export default class RenameDocumentMutation extends Relay.Mutation {
  static fragments = {
    document: () => Relay.QL`
      fragment on Document { id }
    `,
  }
  getMutation = () => Relay.QL`
    mutation { renameDocument }
  `
  getFatQuery = () => Relay.QL`
    fragment on RenameDocumentPayload {
      document {
        name
      }
    }
  `
  getVariables() {
    const {document: {id}, name} = this.props;
    return {id, name};
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {document: this.props.document.id},
    }];
  }
}

