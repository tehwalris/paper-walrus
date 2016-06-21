import React, {Component} from 'react';
import Radium from 'radium';
import Select from 'react-select';
import SelectCreationFilter from '../util/SelectCreationFilter';

@Radium
export default class TagEditor extends Component {
  static propTypes = {
    tags: React.PropTypes.object.isRequired,
    selected: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onCreateTag: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  }

  componentWillMount() {
    this.creationFilter = new SelectCreationFilter(this.getNewOption);
  }

  render() {
    const {selected, style} = this.props;
    const styles = this.getStyles();
    return (
      <Select
        value={selected}
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
    const {onChange, onCreateTag} = this.props;
    const createdTag = _.find(selected, 'create');
    if (createdTag)
      createdTag.value = onCreateTag(createdTag.tagInfo).id;
    onChange(_.uniq(_.map(selected, 'value')));
  };

  getOptions() {
    const {tags} = this.props;
    return _.map(tags, (tag, tagId) => ({
      value: tagId,
      label: tag.name,
    }));
  }

  getNewOption = (inputText) => {
    return {
      label: inputText + ' (new tag)',
      tagInfo: {
        name: inputText,
        type: 'custom',
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
