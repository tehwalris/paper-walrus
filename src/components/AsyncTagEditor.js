import React, {Component} from 'react';
import Radium from 'radium';
import {v4 as uuid} from 'uuid';
import TagEditor from './TagEditor';

@Radium
export default class AsyncTagEditor extends Component {
  static propTypes = {
    selected: React.PropTypes.array.isRequired,
    tags: React.PropTypes.object.isRequired,
    onCreateTag: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  }

  state = {
    tempTags: {},
  };

  componentWillMount() {
    this.onSourceSelectionChange(this.props.selected);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.selected !== newProps.selected)
      this.onSourceSelectionChange(newProps.selected);
  }

  render() {
    const {style} = this.props;
    const {tempSelected} = this.state;
    const tags = this.getMergedTags();
    return (
      <TagEditor
        tags={tags}
        selected={tempSelected}
        onChange={this.onTempSelectedChange}
        onCreateTag={this.onCreateTempTag}
        style={style}
      />
    );
  }

  onCreateTempTag = (tagInfo) => {
    const tempTag = {...tagInfo, id: uuid()};
    const tempTags = {...this.state.tempTags, [tempTag.id]: tempTag};
    this.setState({tempTags});
    this.props.onCreateTag(tagInfo)
      .then(createdTag => this.replaceTag(tempTag, createdTag))
      .catch(() => this.removeTag(tempTag));
    return tempTag;
  }

  onSourceSelectionChange(selected) {
    this.setState({tempSelected: selected});
  }

  onTempSelectedChange = (tempSelected) => {
    this.setState({tempSelected});
    this.maybeNotifyChange(tempSelected);
  }

  getMergedTags() {
    return {...this.props.tags, ...this.state.tempTags};
  }

  maybeNotifyChange(tempSelected) {
    const {tags} = this.props;
    const {selected, onChange} = this.props;
    const selectedAndAvailable = _.filter(tempSelected, id => !!tags[id]);
    if (!_.isEqual(selectedAndAvailable, selected))
      onChange(selectedAndAvailable);
  }

  replaceTag(target, replacement) {
    const {tempSelected} = this.state;
    this.onTempSelectedChange(
      tempSelected.map(id => id === target.id ? replacement.id : id)
    );
    this.setState({tempTags: _.omit(this.state.tempTags, target.id)});
  }

  removeTag(tag) {
    const {tempSelected} = this.state;
    this.onTempSelectedChange(_.without(tempSelected, tag.id));
    this.setState({tempTags: _.omit(this.state.tempTags, tag.id)});
  }
}

