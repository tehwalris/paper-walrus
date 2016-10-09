import Relay from 'react-relay';
import {VIEWER_ID} from 'paper-walrus-server/src/constants';

export default class CleanupTagsMutation extends Relay.Mutation {
  getMutation = () => Relay.QL`
    mutation { cleanupTags }
  `
  getFatQuery = () => Relay.QL`
    fragment on CleanupTagsPayload {
      viewer {
        tags
      }
    }
  `
  getVariables() {
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
