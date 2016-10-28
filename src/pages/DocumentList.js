import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Link} from 'react-router';
import moment from 'moment';
import DocumentFilter from '../components/DocumentFilter';
import DocumentListEntry from '../components/DocumentListEntry'
import CreateDocumentMutation from '../mutations/CreateDocumentMutation';
import {List, ListItem, Button, SidebarLayout, NavReservedArea, ListGroup} from '../components/ui';

@Radium
class DocumentList extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      documents: PropTypes.array.isRequired,
      tags: PropTypes.array.isRequired,
    }).isRequired,
  }

  render() {
    const {viewer: {tags}, relay, createDocument} = this.props;
    if (_.isNil(this.props.viewer.documents)) return null;
    return (
      <SidebarLayout sidebarColorSet="contrast" contentColorSet="base">
        <div>
          <NavReservedArea/>
          <ListItem>
            <Button onClick={this.createDocument}>Create document</Button>
          </ListItem>
          <DocumentFilter
            tags={tags}
            filters={relay.variables}
            onChange={this.onFiltersChange}
          />
        </div>
        <List>
          {this.getGroupedDocuments().map(({label, documents}, i) => (
          <ListGroup key={i} label={label}>
            {documents.map((document, i) => (
            <ListItem key={i} onClick={() => {}}>
              <DocumentListEntry
                document={document}
              />
            </ListItem>
            ))}
          </ListGroup>
          ))}
        </List>
      </SidebarLayout>
    );
  }

  getGroupedDocuments() {
    const {viewer: {documents}} = this.props;
    const cutoffs = {
      today: {label: 'Today', time: moment(), unit: 'day'},
      last7: {label: 'Last 7 days', time: moment().subtract(7, 'd'), unit: 'day'},
      last30: {label: 'Last 30 days', time: moment().subtract(30, 'd'), unit: 'day'},
    };
    const groupedDocuments = _.chain(documents)
      .groupBy(document =>
        _.findKey(
          cutoffs,
          ({time, unit}) => time.isSameOrBefore(moment(document.dateRange.start), unit)
        ) || 'earlier'
      ).value();
    const labeledGroups = [
      {label: 'Today', documents: groupedDocuments.today},
      {label: 'Last 7 days', documents: groupedDocuments.last7},
      {label: 'Last 30 days', documents: groupedDocuments.last30},
      {label: 'Earlier', documents: groupedDocuments.earlier},
    ];
    console.log(labeledGroups);
    return labeledGroups.filter(group => !!group.documents);
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
          dateRange {
            start
          }
        }
        tags {
          id
          ${DocumentFilter.getFragment('tags')}
        }
      }
    `,
  },
});
