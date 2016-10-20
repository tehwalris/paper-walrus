import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {isGeneralType} from '../util/mimeTypes';

@Radium
class DocumentPartContent extends Component {
  static propTypes = {
    part: PropTypes.object.isRequired,
    style: PropTypes.object,
  }

  render() {
    const {part, style} = this.props;
    const {mimeType} = part.sourceFile;
    if(isGeneralType(mimeType, 'image'))
      return <img src={part.sourceFile.url} style={style}/>
    return (
      <div style={style}>
        (unsupported content - {mimeType})
      </div>
    )
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

