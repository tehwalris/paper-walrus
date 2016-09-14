import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {Link} from 'react-router';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import CardGrid from '../components/CardGrid';
import ImageCard from '../components/CardGrid/ImageCard';

@Radium
class SourceFileList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      sourceFiles: PropTypes.arrayOf(PropTypes.shape({
        previewUrl: PropTypes.string,
      })),
    }).isRequired,
  }

  render() {
    const {data: {sourceFiles}} = this.props;
    const styles = this.getStyles();
    if (_.isEmpty(sourceFiles))
      return (<div>No source files available.</div>);
    return (
      <CardGrid>
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
    sourceFiles {
      id
      __typename
      previewUrl
    }
  }
  `,
)(SourceFileList);

export default SourceFileListWithData;
