import React, {Component} from 'react';
import Radium from 'radium';
import FileReaderInput from 'react-file-reader-input';

@Radium
export default class UploadEntry extends Component {
  static propTypes = {
    onFilesSelect: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  }

  render() {
    const {onFilesSelect, style} = this.props;
    const styles = this.getStyles();
    return (
      <FileReaderInput
        onChange={this.onChange}
        accept='image/*, application/pdf'
        multiple
      >
        <div style={[styles.inner, style]}>
          Upload
        </div>
      </FileReaderInput>
    );
  }

  onChange = (event, results) => {
    const files = results.map(result => result[1]);
    this.props.onFilesSelect(files);
  }

  getStyles() {
    return {
      inner: {
        backgroundColor: 'wheat',
      },
    };
  }
}

