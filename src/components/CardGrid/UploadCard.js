import React, {Component} from 'react';
import Radium from 'radium';
import FileReaderInput from 'react-file-reader-input';
import FileDrop from '../FileDrop';
import CardWrapper from './CardWrapper';

@Radium
export default class UploadCard extends Component {
  static propTypes = {
    onFilesSelect: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  }

  render() {
    const {onFilesSelect, style, ...otherProps} = this.props;
    const styles = this.getStyles();
    return (
      <CardWrapper style={style} {...otherProps}>
        <FileDrop
          onDrop={this.onFileDrop}
          style={styles.fileDrop}
        >
          <FileReaderInput
            onChange={this.onFileReaderChange}
            accept='image/*, application/pdf, text/plain'
            multiple
          >
            <div style={styles.inner}>
              Upload
            </div>
          </FileReaderInput>
        </FileDrop>
      </CardWrapper>
    );
  }

  onFileReaderChange = (event, results) => {
    const files = results.map(result => result[1]);
    this.props.onFilesSelect(files);
  }

  onFileDrop = (files) => {
    this.props.onFilesSelect(_.toArray(files));
  }

  getStyles() {
    return {
      inner: {
        padding: '10px',
      },
      fileDrop: {
        height: '100%',
        width: '100%',
      },
    };
  }
}


