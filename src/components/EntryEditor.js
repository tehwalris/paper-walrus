import React, {Component} from 'react';
import Radium from 'radium';
import AsyncTagEditor from '../components/AsyncTagEditor';

@Radium
export default class EntryEditor extends Component {
  static propTypes = {
    entry: React.PropTypes.object.isRequired,
    tags: React.PropTypes.object.isRequired,
    onCreateTag: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  }

  render() {
    const {entry, tags, onCreateTag, style} = this.props;
    const styles = this.getStyles();
    return (
      <div style={[styles.wrapper, style]}>
        <AsyncTagEditor
          tags={tags}
          selected={entry.tags}
          onChange={this.onTagsChange}
          onCreateTag={onCreateTag}
        />
      </div>
    );
  }

  onTagsChange = (tags) => {
    const {entry, onChange} = this.props;
    onChange({...entry, tags});
  }

  getStyles() {
    return {};
  }
}
