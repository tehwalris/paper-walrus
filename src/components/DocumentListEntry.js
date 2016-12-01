import React, {Component} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Heading, Text} from 'rebass';
import LinkBlock from './LinkBlock';
import {ListLinkItem} from './ui';
import RoughDateRange from './RoughDateRange';

@Radium
class DocumentListEntry extends Component {
  render() {
    const {document} = this.props;
    return (
      <ListLinkItem to={`/documents/${document.id}`}>
        <Heading level={3}>
          {document.name || '(unnamed)'}
        </Heading>
        <Text>
          <RoughDateRange dateRange={document.dateRange}/>
        </Text>
      </ListLinkItem>
    );
  }
}

export default Relay.createContainer(DocumentListEntry, {
  fragments: {
    document: () => Relay.QL`
      fragment on Document {
        id
        name
        dateRange {
          ${RoughDateRange.getFragment('dateRange')}
        }
      }
    `,
  },
});

