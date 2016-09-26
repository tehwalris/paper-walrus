import Relay from 'react-relay';

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
    mutation { moveDocumentPart }
  `
  getFatQuery = () => Relay.QL`
    fragment on MoveDocumentPartPayload {
      document {
        parts
      }
    }
  `
  getVariables() {
    return {
      id: this.props.part.id,
      targetPosition: this.props.targetPosition,
    };
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        document: this.props.part.document.id,
      },
    }];
  }
}
