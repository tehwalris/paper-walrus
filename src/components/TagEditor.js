import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import Select from 'react-select';
import SelectCreationFilter from '../util/SelectCreationFilter';

@Radium
class TagEditor extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired,
    selectedTags: PropTypes.array.isRequired,
    onAddTag: PropTypes.func.isRequired,
    onRemoveTag: PropTypes.func.isRequired,
    createTag: PropTypes.func.isRequired,
    style: PropTypes.object,
  }

  componentWillMount() {
    this.creationFilter = new SelectCreationFilter(this.getNewOption);
  }

  render() {
    const {style} = this.props;
    const styles = this.getStyles();
    return (
      <Select
        value={this.getSelected()}
        placeholder='Assign tags'
        options={this.getOptions()}
        onChange={this.onTagsChange}
        wrapperStyle={{...styles.selectWrapper, ...style}}
        filterOptions={this.creationFilter}
        multi
      />
    );
  }

  onTagsChange = (selected) => {
    const {onAddTag, onRemoveTag, createTag} = this.props;
    const createdEntry = _.find(selected, 'create');
    if (createdEntry)
      createTag(createdEntry.tagInfo).then(tag => onAddTag(tag));
    const oldSelectedUniqueTags = _.uniqBy(this.props.selectedTags, 'id');
    const selectedExistingUniqueTags = _.uniqBy(this.mapSelectionToTags(_.without(selected, createdEntry)), 'id');
    const addedEntries = _.differenceBy(selectedExistingUniqueTags, oldSelectedUniqueTags, 'id');
    const removedEntries = _.differenceBy(oldSelectedUniqueTags, selectedExistingUniqueTags, 'id');
    addedEntries.map(onAddTag);
    removedEntries.map(onRemoveTag);
  };

  findTagById(id) {
    return this.props.tags.find(tag => tag.id === id);
  }

  mapSelectionToTags(selected) {
    const {tags} = this.props;
    return selected.map(entry => this.findTagById(entry.value));
  }

  mapTagsToSelection(tags) {
    return tags.map(tag => tag.id);
  }

  getSelected() {
    const {selectedTags} = this.props;
    return this.mapTagsToSelection(selectedTags);
  }

  getOptions() {
    const {tags} = this.props;
    return tags.map(tag => ({
      value: tag.id,
      label: `[${tag.type}] ${tag.text}`,
    }));
  }

  getNewOption = (inputText) => {
    return {
      label: inputText + ' (new tag)',
      tagInfo: {
        type: 'custom',
        text: inputText,
      },
      create: true,
    };
  }

  getStyles() {
    return {
      selectWrapper: {
        maxWidth: '400px',
        width: '100%',
      },
    };
  }
}

export default Relay.createContainer(TagEditor, {
  fragments: {
    tags: () => Relay.QL`
      fragment on Tag @relay(plural: true) {
        id
        type
        text
      }
    `,
    selectedTags: () => Relay.QL`
      fragment on Tag @relay(plural: true) {
        id
      }
    `,
  },
});
