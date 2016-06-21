import React, {Component} from 'react';
import Radium from 'radium';
import Select from 'react-select';

@Radium
export default class TagSearchBar extends Component {
  static propTypes = {
    tags: React.PropTypes.object.isRequired,
    selected: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  }

  render() {
    const {selected, style} = this.props;
    const styles = this.getStyles();
    return (
      <div style={[styles.wrapper, style]}>
        <Select
          value={selected}
          placeholder='Search by tags'
          options={this.getOptions()}
          onChange={this.onTagsChange}
          wrapperStyle={styles.selectWrapper}
          multi
        />
      </div>
    );
  }

  onTagsChange = (selected) => {
    const {onChange} = this.props;
    onChange(_.map(selected, 'value'));
  };

  getOptions() {
    const {tags} = this.props;
    return _.map(tags, (tag, tagId) => ({
      value: tagId,
      label: tag.name,
    }));
  }

  getStyles() {
    return {
      wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      },
      selectWrapper: {
        maxWidth: '500px',
        width: '100%',
      },
    };
  }
}


