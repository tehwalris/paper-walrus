import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Block, Heading, Text} from 'rebass';

@Radium
class DocumentFilterStatus extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired,
    filters: PropTypes.shape({
      requiredTagIds: PropTypes.array.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <div>
        {this.getRequiredTags().map((tag, i) => (
        <Block key={i} my={1}>
          <Text>{tag.type}</Text>
          <Heading level={3}>{tag.text}</Heading>
        </Block>
        ))}
      </div>
    );
  }

  getRequiredTags() {
    const {tags, filters} = this.props;
    return filters.requiredTagIds.map(tagId => {
      return tags.find(tag => tag.id === tagId);
    });
  }
}

export default Relay.createContainer(DocumentFilterStatus, {
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


