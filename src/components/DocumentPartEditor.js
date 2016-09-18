import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import SourceFileUploadGrid from './SourceFileUploadGrid';
import CreateDocumentPartMutation from '../mutations/CreateDocumentPartMutation';

@Radium
class DocumentPartEditor extends Component {
  static propTypes = {
    document: PropTypes.object.isRequired,
    sourceFiles: PropTypes.array.isRequired,
    createDocumentPart: PropTypes.func.isRequired,
    style: PropTypes.object,
  }

  render() {
    const {document, sourceFiles, createDocumentPart, style} = this.props;
    return (
      <div style={[this.styles.wrapper, style]}>
        Document parts: <br/>
        {JSON.stringify(document.parts)}
        <SourceFileUploadGrid
          sourceFiles={sourceFiles}
          onSourceFileClick={this.createDocumentPart}
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
        backgroundColor: 'green',
        color: 'white',
        padding: '3px',
      }
    };
  }
}

export default Relay.createContainer(DocumentPartEditor, {
  fragments: {
    document: () => Relay.QL`
      fragment on Document {
        parts {
          sourceFile {
            url
          }
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
