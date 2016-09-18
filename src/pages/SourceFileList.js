import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import CardGrid from '../components/CardGrid';
import ImageCard from '../components/CardGrid/ImageCard';
import UploadCard from '../components/CardGrid/UploadCard';

@Radium
class SourceFileList extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      sourceFiles: PropTypes.arrayOf(PropTypes.shape({
        previewUrl: PropTypes.string,
      })),
    }),
    actions: PropTypes.shape({
      uploadSourceFiles: PropTypes.func.isRequired,
    }).isRequired,
  }

  render() {
    const {viewer: {sourceFiles}} = this.props;
    if (_.isNil(sourceFiles)) return null;
    return (
      <CardGrid>
        <UploadCard
          onFilesSelect={this.onFilesSelect}
        />
        {sourceFiles.map((sourceFile, i) => (
        <ImageCard
          key={i}
          imageUrl={sourceFile.previewUrl}
        />
        ))}
      </CardGrid>
    );
  }

  onFilesSelect = (files) => {
    const {actions: {uploadSourceFiles}, relay} = this.props;
    uploadSourceFiles(files, (err) => {
      err && console.warn('File upload failed.', err); //Better handling
      relay.forceFetch();
    });
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

const SourceFileListWithActions = connect(() => ({}), mapDispatchToProps)(SourceFileList);

export default Relay.createContainer(SourceFileListWithActions, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        sourceFiles (onlyUnassigned: true){
          previewUrl
        }
      }
    `,
  },
});
