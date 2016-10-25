import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Link} from 'react-router';
import DocumentFilter from '../components/DocumentFilter';
import DocumentListEntry from '../components/DocumentListEntry'
import CreateDocumentMutation from '../mutations/CreateDocumentMutation';
import {List, ListItem, SidebarLayout} from '../components/ui';

@Radium
class DocumentList extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      documents: PropTypes.array.isRequired,
      tags: PropTypes.array.isRequired,
    }).isRequired,
  }

  render() {
    const {viewer: {documents, tags}, relay, createDocument} = this.props;
    if (_.isNil(documents)) return null;
    return (
      <SidebarLayout>
        <DocumentFilter
          tags={tags}
          filters={relay.variables}
          onChange={this.onFiltersChange}
        />
        <List>
          {documents.map((document, i) => (
          <ListItem key={i} onClick={() => {}}>
            <DocumentListEntry
              document={document}
            />
          </ListItem>
          ))}
        </List>
        <div><a onClick={this.createDocument}>[create document]</a></div>
      </SidebarLayout>
    );
  }

  onFiltersChange = (filters) => {
    this.props.relay.setVariables(filters);
  }

  createDocument = () => {
    this.props.relay.commitUpdate(new CreateDocumentMutation());
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
          ${DocumentListEntry.getFragment('document')}
        }
        tags {
          id
          ${DocumentFilter.getFragment('tags')}
        }
      }
    `,
  },
});
