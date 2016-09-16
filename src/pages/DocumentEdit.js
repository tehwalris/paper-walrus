import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import TerribleRenameControl from '../components/TerribleRenameControl';

@Radium
class DocumentEdit extends Component {
  static propTypes = {
    data: PropTypes.shape({
      document: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        parts: PropTypes.arrayOf(PropTypes.shape({
          sourceFile: PropTypes.shape({
            url: PropTypes.string.isRequired,
          }).isRequired,
        })).isRequired,
      }),
      loading: React.PropTypes.bool,
    }).isRequired,
    renameDocument: PropTypes.func.isRequired,
  }

  render() {
    const {data: {document, loading}, renameDocument} = this.props;
    const styles = this.getStyles();
    if (loading)
      return null;
    if (!document)
      return (<div>Document does not exist.</div>);
    return (
      <div>
        Such edit, much wow
        <br/>
        Document name: 
        <TerribleRenameControl
          name={document.name}
          onChange={renameDocument}
        />
        <a onClick={() => renameDocument('walrus')}>[rename to walrus]</a>
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

const DocumentEditWithMutations = graphql(
  gql`
  mutation ($input: RenameDocumentInput!) {
    renameDocument(input: $input) {
      id
      __typename
      name
    }
  }
  `,
  {
    props: ({ownProps: {data: {document}}, mutate}) => ({
      renameDocument: (name) => {
        return mutate({variables: {input: {documentId: document.id, name}}});
      }
    }),
  },
)(DocumentEdit);

const DocumentEditWithMutationsAndData = graphql(
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
)(DocumentEditWithMutations);

export default DocumentEditWithMutationsAndData;
