import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import TagSelect from '../components/TagSelect';

@Radium
class DocumentFilter extends Component {
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
      <div>
        <TagSelect
          tags={tags}
          selectedTags={this.getSelectedTags()}
          onChange={this.onTagsChange}
          placeholder='Search by tags'
        />
      </div>
    );
  }

  getSelectedTags() {
    const {filters, tags} = this.props;
    return filters.requiredTagIds.map(requiredTagId => {
      return tags.find(tag => tag.id === requiredTagId);
    });
  }

  onTagsChange = (tagsFromCallback) => {
    const {onChange, filters} = this.props;
    onChange({...filters, requiredTagIds: tagsFromCallback.map(tag => tag.id)});
  }
}

export default Relay.createContainer(DocumentFilter, {
  fragments: {
    tags: () => Relay.QL`
      fragment on Tag @relay(plural: true) {
        id
        ${TagSelect.getFragment('tags')}
        ${TagSelect.getFragment('selectedTags')}
      }
    `,
  },
});

