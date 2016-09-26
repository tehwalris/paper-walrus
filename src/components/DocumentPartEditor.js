import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import SourceFileUploadGrid from './SourceFileUploadGrid';
import DocumentPartInfo from './DocumentPartInfo';
import CreateDocumentPartMutation from '../mutations/CreateDocumentPartMutation';
import DeleteDocumentPartMutation from '../mutations/DeleteDocumentPartMutation';

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
            onDelete={() => this.deleteDocumentPart(part)}
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

  createDocumentPart = (sourceFileFromUploadGrid) => {
    const {document, relay} = this.props;
    console.log(sourceFileFromUploadGrid, this.props.sourceFiles);
    //HACK since the source file from the upload grid component does not have the right fragment
    const sourceFile = _.find(this.props.sourceFiles, ['__dataID__', sourceFileFromUploadGrid.__dataID__]);
    relay.commitUpdate(new CreateDocumentPartMutation({document, sourceFile}));
  }

  deleteDocumentPart = (part) => {
    const {relay} = this.props;
    relay.commitUpdate(new DeleteDocumentPartMutation({part}));
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
          ${DeleteDocumentPartMutation.getFragment('part')}
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
