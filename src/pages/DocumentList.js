import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Link} from 'react-router';

@Radium
class DocumentList extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    //createDocument: PropTypes.func.isRequired, //TODO
  }

  render() {
    const {viewer: {documents}, createDocument} = this.props;
    if (_.isNil(documents)) return null;
    return (
      <div>
        <ul>
        {documents.map(this.renderItem)}
        <li onClick={createDocument}>Create document</li>
        </ul>
      </div>
    );
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
