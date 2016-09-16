import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {Link} from 'react-router';
import {multiWrapApollo} from '../util/graphql';
import gql from 'graphql-tag';

@Radium
class DocumentList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      documents: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
      loading: PropTypes.bool,
    }).isRequired,
    createDocument: PropTypes.func.isRequired,
  }

  render() {
    const {data: {documents, loading}, createDocument} = this.props;
    const styles = this.getStyles();
    if (loading)
      return null;
    if (_.isEmpty(documents))
      return (<div>No documents available.</div>);
    return (
      <div>
        <ul>
        {documents.map(this.renderItem)}
        <li onClick={createDocument}>Create document</li>
        </ul>
      </div>
    );
  }

  renderItem = (document, i) => {
    return (
      <li key={i}>
        <Link to={`/documents/${document.id}`}>
          {document.name || '(unnamed)'}
        </Link>
      </li>
    );
  }

  getStyles() {
    return {};
  }
}

export default multiWrapApollo(DocumentList, [
  [
    gql`
    mutation ($input: CreateDocumentInput!) {
      createDocument(input: $input) {
        id
        __typename
        name
      }
    }
    `,
    { //TODO no refetch
      props: ({ownProps: {data: {refetch}}, mutate}) => ({
        createDocument: () => {
          return mutate({variables: {input: {visibility: 'standalone'}}})
            .then(() => refetch());
        }
      }),
    },
  ],
  [
    gql`
    query DocumentList {
      documents {
        id
        __typename
        name
      }
    }
    `,
  ],
]);
