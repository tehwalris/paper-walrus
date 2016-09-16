import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

@Radium
class DocumentEdit extends Component {
  static propTypes = {
    data: PropTypes.shape({
      document: PropTypes.shape({
        name: PropTypes.string,
        parts: PropTypes.arrayOf(PropTypes.shape({
          sourceFile: PropTypes.shape({
            url: PropTypes.string.isRequired,
          }).isRequired,
        })).isRequired,
      }),
      loading: React.PropTypes.bool,
    }).isRequired,
  }

  render() {
    const {data: {document, loading}} = this.props;
    const styles = this.getStyles();
    if (loading)
      return null;
    if (!document)
      return (<div>Document does not exist.</div>);
    return (
      <div>
        Such edit, much wow
        Document name: {document.name || '(unnamed)'}
        {this.renderParts(document.parts)}
      </div>
    );
  }

  renderParts = (parts) => {
    return (
      <div>
        Part urls: {parts.map(part => part.sourceFile.url).join(', ')}
      </div>
    );
  }

  getStyles() {
    return {};
  }
}

const DocumentEditWithData = graphql(
  gql`
  query($id: String!) {
    document(id: $id) {
      id
      __typename
      name
      parts {
        sourceFile {
          id
          __typename
          url
        }
      }
    }
  }
  `,
  {options: ({params: {id}}) => ({
    variables: {id},
  })}
)(DocumentEdit);

export default DocumentEditWithData;


