import React, {Component} from 'react';
import Radium from 'radium';
import ReactFileDragAndDrop from 'react-file-drag-and-drop';

@Radium
export default class FileDrop extends Component {
  static propTypes = {
    onDrop: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  }

  static contextTypes = {
    tags: React.PropTypes.object.isRequired,
  }

  state = {
    entryCount: 0,
  }

  render() {
    const {children, onDrop, style} = this.props;
    const styles = this.getStyles();
    return (
      <div style={[styles.wrapper, style]}>
        <ReactFileDragAndDrop
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDragEnd={this.onDragEnd}
        >
          {children}
        </ReactFileDragAndDrop>
      </div>
    );
  }

  onDrop = (transfer) => {
    this.props.onDrop(transfer.files);
    this.setState({entryCount: 0});
  }

  onDragEnter = (event) => {
    if (this.state.entryCount || _.includes(event.dataTransfer.types, 'Files'))
      this.setState({entryCount: this.state.entryCount + 1});
  }

  onDragLeave = () => {
    if (this.state.entryCount)
      this.setState({entryCount: this.state.entryCount - 1});
  }

  onDragEnd = () => {
    this.setState({entryCount: 0});
  }

  getStyles() {
    const dropReady = !!this.state.entryCount;
    return {
      wrapper: {
        backgroundColor: dropReady ? 'green' : undefined,
      },
    };
  }
}
