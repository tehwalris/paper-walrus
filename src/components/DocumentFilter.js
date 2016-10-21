import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Heading} from 'rebass';
import TagSelect from './TagSelect';
import DocumentFilterStatus from './DocumentFilterStatus';
import CardBlock from './CardBlock';
import DocumentQuickFilter from './DocumentQuickFilter';

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
    const {tags, filters} = this.props;
    return (
      <div>
        <DocumentQuickFilter
          tags={tags}
        />
        <CardBlock>
          <TagSelect
            tags={tags}
            selectedTags={[]}
            onChange={this.onTagsAdd}
            placeholder='Search by tags'
          />
          <a onClick={this.onClearFilters}>[clear filters]</a>
        </CardBlock>
        <CardBlock mb={0}>
          <Heading>Current filters</Heading>
          <DocumentFilterStatus
            tags={tags}
            filters={filters}
          />
        </CardBlock>
      </div>
    );
  }

  onTagsAdd = (tagsToAdd) => {
    const {onChange, filters} = this.props;
    const newTagIds = tagsToAdd.map(tag => tag.id);
    onChange({
      ...filters,
      requiredTagIds: _.uniq(filters.requiredTagIds.concat(newTagIds)),
    });
  }

  onClearFilters = () => {
    this.props.onChange({requiredTagIds: []});
  }
}

export default Relay.createContainer(DocumentFilter, {
  fragments: {
    tags: () => Relay.QL`
      fragment on Tag @relay(plural: true) {
        id
        ${TagSelect.getFragment('tags')}
        ${TagSelect.getFragment('selectedTags')}
        ${DocumentFilterStatus.getFragment('tags')}
        ${DocumentQuickFilter.getFragment('tags')}
      }
    `,
  },
});

