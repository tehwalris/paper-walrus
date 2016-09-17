import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import CardGrid from '../components/CardGrid';
import ConvertablePropTypes from '../util/ConvertablePropTypes';
import {idBlockFromPropTypes, simpleQuery} from '../util/graphql';
import ImageCard from '../components/CardGrid/ImageCard';
import UploadCard from '../components/CardGrid/UploadCard';

const SourceFileType = new ConvertablePropTypes(PropTypes => ({
  ...idBlockFromPropTypes(PropTypes),
  previewUrl: PropTypes.string,
}));

@Radium
class SourceFileList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      sourceFiles: PropTypes.arrayOf(SourceFileType.toReact()),
      refetch: PropTypes.func.isRequired,
    }).isRequired,
    actions: PropTypes.shape({
      uploadSourceFiles: PropTypes.func.isRequired,
    }).isRequired,
  }

  render() {
    const {data: {sourceFiles}} = this.props;
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
    const {actions: {uploadSourceFiles}, data: {refetch}} = this.props;
    uploadSourceFiles(files, (err) => {
      err && console.warn('File upload failed.', err); //Better handling
      refetch();
    });
  }
}

const SourceFileListWithData = graphql(
  simpleQuery({sourceFiles: SourceFileType}, {onlyUnassigned: 'Boolean'}),
  {
    options: {variables: {onlyUnassigned: true}},
  },
)(SourceFileList);

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

export default connect(() => ({}), mapDispatchToProps)(SourceFileListWithData);
