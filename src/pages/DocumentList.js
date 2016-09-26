import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Link} from 'react-router';
import CreateDocumentMutation from '../mutations/CreateDocumentMutation';

@Radium
class DocumentList extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
  }

  render() {
    const {viewer: {documents}, createDocument} = this.props;
    if (_.isNil(documents)) return null;
    return (
      <div>
        <ul>
        {documents.map(this.renderItem)}
        <li onClick={this.createDocument}>Create document</li>
        </ul>
      </div>
    );
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
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        documents {
          id
          name
        }
      }
    `,
  },
});
