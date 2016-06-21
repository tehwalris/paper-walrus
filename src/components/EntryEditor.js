import React, {Component} from 'react';
import Radium from 'radium';
import AsyncTagEditor from '../components/AsyncTagEditor';

@Radium
export default class EntryEditor extends Component {
  static propTypes = {
    entry: React.PropTypes.object.isRequired,
    tags: React.PropTypes.object.isRequired,
    onCreateTag: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  }

  state = {}

  componentWillMount() {
    this.onSourceEntryChange(this.props.entry);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.entry !== newProps.entry)
      this.onSourceEntryChange(newProps.entry);
  }

  render() {
    const {tags, onCreateTag, style} = this.props;
    const {tempEntry} = this.state;
    const styles = this.getStyles();
    return (
      <div style={[styles.wrapper, style]}>
        <AsyncTagEditor
          tags={tags}
          selected={tempEntry.tags}
          onChange={this.onSelectedTagsChange}
          onCreateTag={onCreateTag}
        />
      </div>
    );
  }

  onSelectedTagsChange = (tags) => {
    console.log('real tag change', tags);
    this.setState({tempEntry: {...this.state.entry, tags}});
  }

  onSourceEntryChange(entry) {
    this.setState({tempEntry: entry});
  }

  getStyles() {
    return {};
  }
}
