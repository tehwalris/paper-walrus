import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Input, Heading, Text, Block} from 'rebass';
import CardBlock from './CardBlock';
import MenuList from './MenuList';
import MenuListItem from './MenuListItem';

@Radium
class DocumentQuickFilter extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired,
    filters: PropTypes.shape({
      requiredTagIds: PropTypes.array.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const {tags} = this.props;
    return (
      <CardBlock mt={0} p={0}>
        <MenuList m={0}>
          <MenuListItem py={2}>
            <Input m={0} placeholder="Quick filter..." />
          </MenuListItem>
          {_.range(4).map(i => (
          <MenuListItem
            key={i}
            onClick={() => console.log('walrus')}
          >
            <Text>Require subject tag</Text>
            <Heading level={3}>diskmat</Heading>
          </MenuListItem>
          ))}
        </MenuList>
      </CardBlock>
    );
  }
}

export default Relay.createContainer(DocumentQuickFilter, {
  fragments: {
    tags: () => Relay.QL`
      fragment on Tag @relay(plural: true) {
        id
        type
        text
      }
    `,
  },
});
