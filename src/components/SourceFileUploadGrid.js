import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import CardGrid from '../components/CardGrid';
import SourceFileCard from '../components/SourceFileCard';
import UploadCard from '../components/CardGrid/UploadCard';
import UploadSourceFilesMutation from '../mutations/UploadSourceFilesMutation';
import DeleteSourceFileMutation from '../mutations/DeleteSourceFileMutation';

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
        <SourceFileCard
          key={i}
          sourceFile={sourceFile}
          onClick={() => onSourceFileClick(sourceFile)}
        >
          <a onClick={() => this.deleteSourceFile(sourceFile)}>
            [delete]
          </a>
          <a href={sourceFile.url}>
            [view]
          </a>
        </SourceFileCard>
        ))}
      </CardGrid>
    );
  }

  uploadFiles = (files) => {
    const {relay} = this.props;
    relay.commitUpdate(new UploadSourceFilesMutation({files}));
  }

  deleteSourceFile = (sourceFile) => {
    const {relay} = this.props;
    relay.commitUpdate(new DeleteSourceFileMutation({sourceFile}));
  }
}

export default Relay.createContainer(SourceFileUploadGrid, {
  fragments: {
    sourceFiles: () => Relay.QL`
      fragment on SourceFile @relay(plural: true) {
        url
        previewUrl
        ${DeleteSourceFileMutation.getFragment('sourceFile')}
        ${SourceFileCard.getFragment('sourceFile')}
      }
    `,
  },
});

