import Relay from 'react-relay';
import {VIEWER_ID} from 'paper-walrus-server/src/constants';

export default class DeleteSourceFileMutation extends Relay.Mutation {
  static fragments = {
    sourceFile: () => Relay.QL`
      fragment on SourceFile { id }
    `,
  }
  getMutation = () => Relay.QL`
    mutation { deleteSourceFile }
  `
  getFatQuery = () => Relay.QL`
    fragment on DeleteSourceFilePayload {
      sourceFile
      viewer {
        sourceFiles
      }
    }
  `
  getVariables() {
    return {id: this.props.sourceFile.id};
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: VIEWER_ID,
      },
    }];
  }
}
