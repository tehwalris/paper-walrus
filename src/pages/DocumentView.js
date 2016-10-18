import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import DocumentContentView from '../components/DocumentContentView';
import {Link} from 'react-router';

@Radium
class DocumentView extends Component {
  static propTypes = {
    document: PropTypes.object,
  }

  render() {
    const {document} = this.props;
    if(!document) return null;
    return (
      <div>
        Document name: {document.name || '(unnamed)'} <br/>
        Date: {document.dateRange.start} to {document.dateRange.end} <br/>
        <Link to={`/documents/${document.id}/edit`}>Edit document</Link>
        <DocumentContentView
          document={document}
        />
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
        dateRange {
          start
          end
        }
        ${DocumentContentView.getFragment('document')}
      }
    `,
  },
});
