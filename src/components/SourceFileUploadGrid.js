import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import CardGrid from '../components/CardGrid';
import ImageCard from '../components/CardGrid/ImageCard';
import UploadCard from '../components/CardGrid/UploadCard';
import UploadSourceFilesMutation from '../mutations/UploadSourceFilesMutation';
import TestCode from '../mutations/UploadSourceFilesMutation.js';

@Radium
class SourceFileUploadGrid extends Component {
  static propTypes = {
    sourceFiles: PropTypes.array.isRequired,
    onSourceFileClick: PropTypes.func.isRequired,
    style: PropTypes.object,
  }

  static defaultProps = {
    onSourceFileClick: () => {},
  }

  render() {
    const {sourceFiles, onSourceFileClick, style} = this.props;
    return (
      <CardGrid style={style}>
        <UploadCard
          onFilesSelect={this.uploadFiles}
        />
        {sourceFiles.map((sourceFile, i) => (
        <ImageCard
          key={i}
          imageUrl={sourceFile.previewUrl}
          onClick={() => onSourceFileClick(sourceFile)}
        />
        ))}
      </CardGrid>
    );
  }

  uploadFiles = (files) => {
    const {relay} = this.props;
    relay.commitUpdate(new UploadSourceFilesMutation({files}));
  }
}

export default Relay.createContainer(SourceFileUploadGrid, {
  fragments: {
    sourceFiles: () => Relay.QL`
      fragment on SourceFile @relay(plural: true) {
        previewUrl
      }
    `,
  },
});

