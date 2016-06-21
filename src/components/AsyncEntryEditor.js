import React, {Component} from 'react';
import Radium from 'radium';
import EntryEditor from './EntryEditor';

@Radium
export default class AsyncEntryEditor extends Component {
  static propTypes = {
    entry: React.PropTypes.object.isRequired,
    tags: React.PropTypes.object.isRequired,
    onCreateTag: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  }

  state = {};

  componentWillMount() {
    this.onSourceChange(this.props.entry);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.entry !== newProps.entry)
      this.onSourceChange(newProps.entry);
  }

  render() {
    const {tempEntry} = this.state;
    return (
      <EntryEditor
        {...this.props}
        entry={tempEntry}
        onChange={this.onTempChange}
      />
    );
  }

  onSourceChange(entry) {
    this.setState({tempEntry: entry});
  }

  onTempChange = (tempEntry) => {
    this.setState({tempEntry});
    this.props.onChange(tempEntry);
  }
}

