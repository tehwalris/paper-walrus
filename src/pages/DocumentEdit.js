import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {withRouter} from 'react-router';
import ConvertablePropTypes from '../util/ConvertablePropTypes';
import {idBlockFromPropTypes, simpleQuery, simpleMutation, multiWrapApollo} from '../util/graphql';
import TerribleRenameControl from '../components/TerribleRenameControl';
import DocumentPartEditor from '../components/DocumentPartEditor';

const {DocumentPartType} = DocumentPartEditor;

const DocumentType = new ConvertablePropTypes(PropTypes => ({
  ...idBlockFromPropTypes(PropTypes),
  name: PropTypes.string,
  parts: PropTypes.arrayOf(DocumentPartType.toStructure()).isRequired,
}));

@Radium
class DocumentEdit extends Component {
  static propTypes = {
    data: PropTypes.shape({
      document: DocumentType.toReact(),
    }).isRequired,
    renameDocument: PropTypes.func.isRequired,
    deleteDocument: PropTypes.func.isRequired,
    createDocumentPart: PropTypes.func.isRequired,
  }

  render() {
    const {data: {document}, renameDocument, createDocumentPart} = this.props;
    if (!document) return null;
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
        <DocumentPartEditor
          parts={document.parts}
          createDocumentPart={createDocumentPart}
        />
      </div>
    );
  }

  onClickDelete = () => {
    const {deleteDocument, router} = this.props;
    deleteDocument().then(() => router.push('/documents'));
  }
}

export default multiWrapApollo(withRouter(DocumentEdit), [
  [
    simpleMutation({renameDocument: DocumentType}, {input: 'RenameDocumentInput!'}),
    {
      props: ({ownProps: {data: {document}}, mutate}) => ({
        renameDocument: (name) => {
          return mutate({variables: {input: {id: document.id, name}}});
        },
      }),
    },
  ],
  [
    simpleMutation({deleteDocument: null}, {input: 'DeleteDocumentInput!'}),
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
    simpleMutation({createDocumentPart: DocumentPartType}, {input: 'CreateDocumentPartInput!'}),
    {
      props: ({ownProps: {data: {document, refetch}}, mutate}) => ({
        createDocumentPart: (input) => {
          return mutate({variables: {input: {...input, documentId: document.id}}})
            .then(() => refetch()); //TODO
        },
      }),
    },
  ],
  [
    simpleQuery({document: DocumentType}, {id: 'String!'}),
    {
      options: ({params: {id}}) => ({variables: {id}})
    },
  ],
]);

