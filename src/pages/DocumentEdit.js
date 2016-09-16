import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import gql from 'graphql-tag';
import {withRouter} from 'react-router';
import {multiWrapApollo} from '../util/graphql';
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
    deleteDocument: PropTypes.func.isRequired,
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
        <a onClick={() => this.onClickDelete()}>[delete]</a>
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

  onClickDelete = () => {
    const {deleteDocument, router} = this.props;
    deleteDocument().then(() => router.push('/documents'));
  }

  getStyles() {
    return {};
  }
}

export default multiWrapApollo(withRouter(DocumentEdit), [
  [
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
          return mutate({variables: {input: {id: document.id, name}}});
        },
      }),
    },
  ],
  [
    gql`
    mutation ($input: DeleteDocumentInput!) {
      deleteDocument(input: $input)
    }
    `,
    {
      props: ({ownProps: {data: {document}}, mutate}) => ({
        deleteDocument: () => {
          return mutate({variables: {input: {id: document.id}}})
            .then(({data: {deleteDocument: deletedId}}) => {
              if (deletedId !== document.id)
                return Promise.reject('Deletion failed.');
            });
        },
      }),
      options: () => ({
        updateQueries: {
          DocumentList: ({documents}, {mutationResult: {data: {deleteDocument: deletedId}}}) => {
            return {
              documents: documents.filter(document => document.id !== deletedId),
            };
          },
        },
      }),
    },
  ],
  [
    gql`
    query ($id: String!) {
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
  ],
]);

