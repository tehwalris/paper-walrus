import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {withRouter} from 'react-router';
import TerribleRenameControl from '../components/TerribleRenameControl';
import DocumentPartEditor from '../components/DocumentPartEditor';
import RenameDocumentMutation from '../mutations/RenameDocumentMutation';
import DeleteDocumentMutation from '../mutations/DeleteDocumentMutation';

@Radium
class DocumentEdit extends Component {
  static propTypes = {
    document: PropTypes.object,
    viewer: PropTypes.shape({
      sourceFiles: PropTypes.array.isRequired,
    }).isRequired,
    sourceFiles: PropTypes.object,
  }

  render() {
    const {document, viewer: {sourceFiles}} = this.props;
    if(!document) return null;
    return (
      <div>
        Such edit, much wow
        <br/>
        Document name: 
        <TerribleRenameControl
          name={document.name}
          onChange={this.renameDocument}
        />
        <a onClick={() => this.renameDocument('walrus')}>[rename to walrus]</a>
        <a onClick={this.deleteDocument}>[delete]</a>
        <DocumentPartEditor
          document={document}
          sourceFiles={sourceFiles}
        />
      </div>
    );
  }

  renameDocument = (name) => {
    const {document, relay} = this.props;
    relay.commitUpdate(new RenameDocumentMutation({document, name}));
  }

  deleteDocument = () => {
    const {document, relay, router} = this.props;
    relay.commitUpdate(
      new DeleteDocumentMutation({document}),
      {onSuccess: () => router.push('/documents')},
    );
  }
}

export default Relay.createContainer(withRouter(DocumentEdit), {
  fragments: {
    document: () => Relay.QL`
      fragment on Document {
        name
        ${DocumentPartEditor.getFragment('document')}
        ${RenameDocumentMutation.getFragment('document')}
        ${DeleteDocumentMutation.getFragment('document')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        sourceFiles (onlyUnassigned: true) {
          ${DocumentPartEditor.getFragment('sourceFiles')}
        }
      }
    `,
  },
});
