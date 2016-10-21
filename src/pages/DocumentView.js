import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Link} from 'react-router';
import DocumentContentView from '../components/DocumentContentView';
import RoughDateRange from '../components/RoughDateRange';

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
        Date: <RoughDateRange dateRange={document.dateRange}/><br/>
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
          ${RoughDateRange.getFragment('dateRange')}
        }
        ${DocumentContentView.getFragment('document')}
      }
    `,
  },
});
