import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {Link} from 'react-router';
import ConvertablePropTypes from '../util/ConvertablePropTypes';
import {idBlockFromPropTypes, simpleQuery, simpleMutation, multiWrapApollo} from '../util/graphql';

const DocumentType = new ConvertablePropTypes(PropTypes => ({
  ...idBlockFromPropTypes(PropTypes),
  name: PropTypes.string,
}));

@Radium
class DocumentList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      documents: PropTypes.arrayOf(DocumentType.toReact()),
    }).isRequired,
    createDocument: PropTypes.func.isRequired,
  }

  render() {
    const {data: {documents}, createDocument} = this.props;
    if (_.isNil(documents)) return null;
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
}

export default multiWrapApollo(DocumentList, [
  [
    simpleMutation({createDocument: DocumentType}, {input: 'CreateDocumentInput!'}),
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
    simpleQuery({documents: DocumentType}, {}, 'DocumentList'),
  ],
]);
