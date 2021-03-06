import Relay from 'react-relay';

export default class UploadSourceFilesMutation extends Relay.Mutation {
  getMutation = () => Relay.QL`
    mutation { uploadSourceFiles }
  `
  getFatQuery = () => Relay.QL`
    fragment on UploadSourceFilesPayload {
      uploadTargets {
        key
        postUrl
        formData {
          key
          value
        }
      }
    }
  `
  getVariables() {
    return {
      plannedUploadInfo: this.props.files.map(({name, type}) => ({name, type})),
    };
  }
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL`
        fragment on UploadSourceFilesPayload {
          uploadTargets {
            key
            postUrl
            formData {
              key
              value
            }
          }
        }
      `],
    }];
  }
}
