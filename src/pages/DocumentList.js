import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Link} from 'react-router';
import TagSelect from '../components/TagSelect';
import CreateDocumentMutation from '../mutations/CreateDocumentMutation';

@Radium
class DocumentList extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      documents: PropTypes.array.isRequired,
      tags: PropTypes.array.isRequired,
    }).isRequired,
  }

  render() {
    const {viewer: {documents, tags}, createDocument} = this.props;
    if (_.isNil(documents)) return null;
    return (
      <div>
        <TagSelect
          tags={tags}
          selectedTags={this.getSelectedTags()}
          onChange={this.onTagsChange}
          placeholder='Search by tags'
        />
        <ul>
        {documents.map(this.renderItem)}
        <li onClick={this.createDocument}>Create document</li>
        </ul>
      </div>
    );
  }

  getSelectedTags() {
    const {viewer: {tags}, relay} = this.props;
    return relay.variables.requiredTagIds.map(requiredTagId => {
      return tags.find(tag => tag.id === requiredTagId);
    });
  }

  onTagsChange = (tagsFromCallback) => {
    const {viewer: {tags}, relay} = this.props;
    relay.setVariables({
      requiredTagIds: tagsFromCallback.map(tag => tag.id),
    });
  }

  createDocument = () => {
    const {relay} = this.props;
    relay.commitUpdate(new CreateDocumentMutation());
  }

  renderItem = (document, i) => {
    return (
      <li key={i}>
        <Link to={`/documents/${document.id}`}>
          {document.name || '(unnamed)'}
        </Link>
      </li>
    );
  }
}

export default Relay.createContainer(DocumentList, {
  initialVariables: {
    requiredTagIds: [],
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        documents(requiredTagIds: $requiredTagIds) {
          id
          name
        }
        tags {
          id
          ${TagSelect.getFragment('tags')}
          ${TagSelect.getFragment('selectedTags')}
        }
      }
    `,
  },
});
