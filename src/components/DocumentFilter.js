import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Heading} from 'rebass';
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

  constructor() {
    super();
    this.filterActions = _.pick(this, [
      'addRequiredTag',
      'clearFilters',
      'removeLastRequiredTag',
    ]);
  }

  render() {
    const {tags, filters} = this.props;
    return (
      <div>
        <DocumentQuickFilter
          tags={tags}
          actions={this.filterActions}
        />
        <CardBlock mb={0}>
          <Heading>Current filters</Heading>
          <a onClick={this.filterActions.clearFilters}>[clear filters]</a>
          <DocumentFilterStatus
            tags={tags}
            filters={filters}
          />
        </CardBlock>
      </div>
    );
  }

  onSelectChange = (tagsToAdd) => {
    const {onChange, filters} = this.props;
    tagsToAdd.forEach(tag => this.filterActions.addRequiredTag(tag.id));
  }

  addRequiredTag = (tagId) => {
    const {onChange, filters} = this.props;
    onChange({
      ...filters,
      requiredTagIds: _.uniq([...filters.requiredTagIds, tagId]),
    });
  }

  removeLastRequiredTag = () => {
    const {onChange, filters} = this.props;
    onChange({
      ...filters,
      requiredTagIds: _.dropRight(filters.requiredTagIds),
    });
  }

  clearFilters = () => {
    this.props.onChange({requiredTagIds: []});
  }
}

export default Relay.createContainer(DocumentFilter, {
  fragments: {
    tags: () => Relay.QL`
      fragment on Tag @relay(plural: true) {
        id
        ${DocumentFilterStatus.getFragment('tags')}
        ${DocumentQuickFilter.getFragment('tags')}
      }
    `,
  },
});

