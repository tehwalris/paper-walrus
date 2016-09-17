import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import TerribleRenameControl from '../components/TerribleRenameControl';
import DocumentPartEditor from '../components/DocumentPartEditor';

@Radium
class DocumentEdit extends Component {
  static propTypes = {
    document: PropTypes.object.isRequired,
    //renameDocument: PropTypes.func.isRequired, //TODO
    //deleteDocument: PropTypes.func.isRequired, //TODO
    //createDocumentPart: PropTypes.func.isRequired, //TODO
  }

  render() {
    const {document, renameDocument, createDocumentPart} = this.props;
    return (
      <div>
        Such edit, much wow
        <br/>
        Document name: 
        <TerribleRenameControl
          name={document.name}
          onChange={renameDocument}
        />
        <a onClick={() => renameDocument('walrus')}>[rename to walrus]</a>
        <a onClick={() => this.onClickDelete()}>[delete]</a>
        <DocumentPartEditor
          document={document}
          createDocumentPart={createDocumentPart}
        />
      </div>
    );
  }

  onClickDelete = () => {
    const {deleteDocument, router} = this.props;
    deleteDocument().then(() => router.push('/documents'));
  }
}

export default Relay.createContainer(DocumentEdit, {
  fragments: {
    document: () => Relay.QL`
      fragment on Document {
        name
        ${DocumentPartEditor.getFragment('document')}
      }
    `,
  },
});
