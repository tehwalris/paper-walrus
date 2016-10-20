import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import ContentPreview from './ContentPreview';

@Radium
class DocumentPartInfo extends Component {
  static propTypes = {
    part: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    style: PropTypes.object,
  }

  render() {
    const {part, onDelete, onMove, style} = this.props;
    return (
      <div style={[this.styles.wrapper, style]}>
        {this.renderPreview()}
        <div style={this.styles.description}>
          MIME Type: {part.sourceFile.mimeType}
          <div><a onClick={onDelete}>[delete]</a></div>
          <div><a onClick={() => onMove('up')}>[up]</a></div>
          <div><a onClick={() => onMove('down')}>[down]</a></div>
        </div>
      </div>
    );
  }

  renderPreview() {
    const {previewUrl} = this.props.part.sourceFile;
    if(!previewUrl)
      return <div style={this.styles.preview}>(no preview)</div>
    return (
      <ContentPreview
        imageUrl={previewUrl}
        style={this.styles.preview}
      />
    )
  }

  get styles() {
    return {
      wrapper: {
        display: 'flex',
        backgroundColor: 'blue',
        color: 'white',
        border: '1px solid pink',
      },
      preview: {
        width: '200px',
        height: '200px',
      },
      description: {
        flexGrow: '1',
        padding: '20px',
      },
    };
  }
}

export default Relay.createContainer(DocumentPartInfo, {
  fragments: {
    part: () => Relay.QL`
      fragment on DocumentPart {
        sourceFile {
          previewUrl
          mimeType
        }
      }
    `,
  },
});
