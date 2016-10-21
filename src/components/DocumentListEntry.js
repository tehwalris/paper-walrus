import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Heading, Text} from 'rebass';
import LinkBlock from './LinkBlock'
import RoughDateRange from './RoughDateRange';

@Radium
class DocumentListEntry extends Component {
  render() {
    const {document} = this.props;
    return (
      <LinkBlock to={`/documents/${document.id}`}>
        <Heading>
          {document.name || '(unnamed)'}
        </Heading>
        <Text>
          <RoughDateRange dateRange={document.dateRange}/>
        </Text>
      </LinkBlock>
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

