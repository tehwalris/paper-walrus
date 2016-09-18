import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {withRouter} from 'react-router';
import TerribleRenameControl from '../components/TerribleRenameControl';
import DocumentPartEditor from '../components/DocumentPartEditor';
import RenameDocumentMutation from '../mutations/RenameDocumentMutation';
import DeleteDocumentMutation from '../mutations/DeleteDocumentMutation';
import CreateDocumentPartMutation from '../mutations/CreateDocumentPartMutation';

@Radium
class DocumentEdit extends Component {
  static propTypes = {
    document: PropTypes.object,
  }

  render() {
    const {document} = this.props;
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
          createDocumentPart={this.createDocumentPart}
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

  createDocumentPart = () => {
    const {document, relay} = this.props;
    const sourceFile = {id: 'U291cmNlRmlsZToxMDE='};
    relay.commitUpdate(new CreateDocumentPartMutation({document, sourceFile}));
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
        ${CreateDocumentPartMutation.getFragment('document')}
      }
    `,
  },
});
