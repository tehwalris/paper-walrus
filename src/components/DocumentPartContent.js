import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import ContentPreview from './ContentPreview';

@Radium
class DocumentPartContent extends Component {
  static propTypes = {
    part: PropTypes.object.isRequired,
    style: PropTypes.object,
  }

  render() {
    const {part, style} = this.props;
    //TODO non-image
    return (
      <img src={part.sourceFile.url} style={style}/>
    );
  }
}

export default Relay.createContainer(DocumentPartContent, {
  fragments: {
    part: () => Relay.QL`
      fragment on DocumentPart {
        sourceFile {
          url
          mimeType
        }
      }
    `,
  },
});

