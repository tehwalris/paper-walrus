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
    document: PropTypes.object.isRequired,
    //createDocumentPart: PropTypes.func.isRequired, //TODO
  }

  render() {
    const {document, createDocumentPart} = this.props;
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
          createDocumentPart={createDocumentPart}
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
  },
});
