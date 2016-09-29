import Relay from 'react-relay';
import {VIEWER_ID} from 'paper-walrus-server/src/constants';

export default class CreateTagMutation extends Relay.Mutation {
  getMutation = () => Relay.QL`
    mutation { createTag }
  `
  getFatQuery = () => Relay.QL`
    fragment on CreateTagPayload {
      tag
      viewer {
        tags
      }
    }
  `
  getVariables() {
    const {type, text} = this.props;
    return {tag: {type, text}};
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: VIEWER_ID,
      },
    }, {
      type: 'REQUIRED_CHILDREN', // HACK Reduired for TagEditor promise
      children: [Relay.QL`
        fragment on CreateTagPayload {
          tag {
            id
          }
        }
      `],
    }];
  }
}
