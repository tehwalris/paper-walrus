import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {Link} from 'react-router';
import {graphql} from 'react-apollo';
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
          onFilesSelect={() => alert('TODO')}
        />
        {sourceFiles.map(this.renderItem)}
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

export default SourceFileListWithData;
