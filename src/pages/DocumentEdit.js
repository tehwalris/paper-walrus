import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {withRouter} from 'react-router';
import TerribleRenameControl from '../components/TerribleRenameControl';
import DocumentPartEditor from '../components/DocumentPartEditor';
import RenameDocumentMutation from '../mutations/RenameDocumentMutation';
import DeleteDocumentMutation from '../mutations/DeleteDocumentMutation';
import TagEditor from '../components/TagEditor';
import CreateTagMutation from '../mutations/CreateTagMutation';
import AddTagToDocumentMutation from '../mutations/AddTagToDocumentMutation';
import RemoveTagFromDocumentMutation from '../mutations/RemoveTagFromDocumentMutation';

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
    const {document, viewer: {sourceFiles, tags}} = this.props;
    if (!document) return null;
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
        <TagEditor
          tags={tags}
          selectedTags={document.tags}
          onAddTag={this.addTag}
          onRemoveTag={this.removeTag}
          createTag={this.createTag}
        />
        <DocumentPartEditor
          document={document}
          sourceFiles={sourceFiles}
        />
      </div>
    );
  }

  createTag = (tagInfo) => {
    const {relay} = this.props;
    return new Promise((resolve, reject) => {
      relay.commitUpdate(new CreateTagMutation(tagInfo), {
        onSuccess: ({createTag: {tag}}) => resolve(tag),
        onFailure: () => reject(),
      });
    });
  }

  addTag = (tagFromCallback) => {
    const {document, viewer, relay} = this.props;
    const tag = viewer.tags.find(tag => tag.id === tagFromCallback.id);
    relay.commitUpdate(new AddTagToDocumentMutation({document, tag}));
  }

  removeTag = (tagFromCallback) => {
    const {document, viewer, relay} = this.props;
    const tag = viewer.tags.find(tag => tag.id === tagFromCallback.id);
    relay.commitUpdate(new RemoveTagFromDocumentMutation({document, tag}));
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
        ${AddTagToDocumentMutation.getFragment('document')}
        ${RemoveTagFromDocumentMutation.getFragment('document')}
        tags {
          ${TagEditor.getFragment('selectedTags')}
        }
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        sourceFiles (onlyUnassigned: true) {
          ${DocumentPartEditor.getFragment('sourceFiles')}
        }
        tags {
          id
          ${TagEditor.getFragment('tags')}
          ${AddTagToDocumentMutation.getFragment('tag')}
          ${RemoveTagFromDocumentMutation.getFragment('tag')}
        }
      }
    `,
  },
});
