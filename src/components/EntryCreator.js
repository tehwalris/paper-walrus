import React, {Component} from 'react';
import Radium from 'radium';
import Dropzone from 'react-dropzone';

@Radium
export default class EntryCreator extends Component {
  static propTypes = {
    style: React.PropTypes.object,
  }

  render() {
    const {style} = this.props;
    const styles = this.getStyles();
    return (
      <div style={[styles.wrapper, style]}>
        <Dropzone onDrop={this.onDrop}>
          walrus
        </Dropzone>
      </div>
    );
  }

  onDrop(files) {
    console.log(files);
  }

  getStyles() {
    return {
      wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
      },
    };
  }
}



