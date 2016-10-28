import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import DocumentPartContent from './DocumentPartContent';

@Radium
class DocumentContentView extends Component {
  static propTypes = {
    document: PropTypes.object.isRequired,
    style: PropTypes.object,
  }

  render() {
    const {document, style} = this.props;
    return (
      <div style={[this.styles.wrapper, style]}>
        {document.parts.map((part, i) => (
        <a key={i} href={part.sourceFile.url}>
          <DocumentPartContent
            part={part}
            style={this.styles.part}
          />
        </a>
        ))}
      </div>
    );
  }

  get styles() {
    return {
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
      },
      part: {
        width: '100%',
        height: 'auto',
        maxHeight: '1000px',
        objectFit: 'scale-down',
        margin: '20px 0',
      },
    };
  }
}

export default Relay.createContainer(DocumentContentView, {
  fragments: {
    document: () => Relay.QL`
      fragment on Document {
        parts {
          sourceFile {
            url
          }
          ${DocumentPartContent.getFragment('part')}
        }
      }
    `,
  },
});

