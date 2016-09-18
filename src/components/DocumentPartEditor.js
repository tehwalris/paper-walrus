import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import SourceFileUploadGrid from './SourceFileUploadGrid';
import DocumentPartInfo from './DocumentPartInfo';
import CreateDocumentPartMutation from '../mutations/CreateDocumentPartMutation';

@Radium
class DocumentPartEditor extends Component {
  static propTypes = {
    document: PropTypes.object.isRequired,
    sourceFiles: PropTypes.array.isRequired,
    style: PropTypes.object,
  }

  render() {
    const {document, sourceFiles, style} = this.props;
    return (
      <div style={[this.styles.wrapper, style]}>
        <div style={this.styles.partList}>
          {document.parts.map((part, i) => (
          <DocumentPartInfo
            key={i}
            part={part}
            style={this.styles.part}
          />
          ))}
        </div>
        <SourceFileUploadGrid
          sourceFiles={sourceFiles}
          onSourceFileClick={this.createDocumentPart}
          style={this.styles.sourceFileGrid}
        />
      </div>
    );
  }

  createDocumentPart = (sourceFile) => {
    const {document, relay} = this.props;
    relay.commitUpdate(new CreateDocumentPartMutation({document, sourceFile}));
  }

  get styles() {
    return {
      wrapper: {
        display: 'flex',
        backgroundColor: 'green',
      },
      partList: {
        flex: '50% 1 1',
        overflow: 'hidden',
        borderRight: '2px solid pink',
      },
      sourceFileGrid: {
        flex: '50% 1 1',
        overflow: 'hidden',
      },
      part: {
        margin: '10px',
      },
    };
  }
}

export default Relay.createContainer(DocumentPartEditor, {
  fragments: {
    document: () => Relay.QL`
      fragment on Document {
        parts {
          ${DocumentPartInfo.getFragment('part')}
        }
        ${CreateDocumentPartMutation.getFragment('document')}
      }
    `,
    sourceFiles: () => Relay.QL`
      fragment on SourceFile @relay(plural: true) {
        ${SourceFileUploadGrid.getFragment('sourceFiles')}
        ${CreateDocumentPartMutation.getFragment('sourceFile')}
      }
    `,
  },
});
