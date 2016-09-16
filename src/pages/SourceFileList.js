import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import gql from 'graphql-tag';
import CardGrid from '../components/CardGrid';
import ImageCard from '../components/CardGrid/ImageCard';
import UploadCard from '../components/CardGrid/UploadCard';

@Radium
class SourceFileList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      sourceFiles: PropTypes.arrayOf(PropTypes.shape({
        previewUrl: PropTypes.string,
      })),
      loading: React.PropTypes.bool,
      refetch: PropTypes.func.isRequired,
    }).isRequired,
    actions: PropTypes.shape({
      uploadSourceFiles: PropTypes.func.isRequired,
    }).isRequired,
  }

  render() {
    const {data: {sourceFiles, loading}} = this.props;
    const styles = this.getStyles();
    if (loading)
      return null;
    return (
      <CardGrid>
        <UploadCard
          onFilesSelect={this.onFilesSelect}
        />
        {sourceFiles && sourceFiles.map(this.renderItem)}
      </CardGrid>
    );
  }

  renderItem = (sourceFile, i) => {
    return (
      <ImageCard
        key={i}
        imageUrl={sourceFile.previewUrl}
      />
    );
  }

  onFilesSelect = (files) => {
    const {actions: {uploadSourceFiles}, data: {refetch}} = this.props;
    uploadSourceFiles(files, (err) => {
      err && console.warn('File upload failed.', err); //Better handling
      refetch();
    });
  }

  getStyles() {
    return {};
  }
}

const SourceFileListWithData = graphql(
  gql`
  query {
    sourceFiles(onlyUnassigned: true) {
      id
      __typename
      previewUrl
    }
  }
  `,
)(SourceFileList);

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceFileListWithData);
