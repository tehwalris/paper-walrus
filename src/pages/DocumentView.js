import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Link} from 'react-router';

@Radium
class DocumentView extends Component {
  static propTypes = {
    document: PropTypes.object.isRequired,
  }

  render() {
    const {document} = this.props;
    return (
      <div>
        Document name: {document.name || '(unnamed)'}
        <div>
          Part urls: {document.parts.map(part => part.sourceFile.url).join(', ')}
        </div>
        <Link to={`/documents/${document.id}/edit`}>Edit</Link>
      </div>
    );
  }
}

export default Relay.createContainer(DocumentView, {
  fragments: {
    document: () => Relay.QL`
      fragment on Document {
        id
        name
        parts {
          sourceFile {
            url
          }
        }
      }
    `,
  },
});
