import React, {Component} from 'react';
import Radium from 'radium';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

@Radium
class ApolloTest extends Component {
  static propTypes = {
    data: React.PropTypes.shape({
      sourceFile: React.PropTypes.object,
    }),
  }

  render() {
    const {data: {sourceFile}} = this.props;
    const styles = this.getStyles();
    return (
      <div>
        Source file: {JSON.stringify(sourceFile)}
      </div>
    );
  }

  getStyles() {
    return {};
  }
}

const ApolloTestWithData = graphql(gql`{
  sourceFile(id: "1") {
    filename
    mimeType
  }
}`)(ApolloTest);

export default ApolloTestWithData;

