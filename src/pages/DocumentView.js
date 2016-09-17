import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {Link} from 'react-router';
import {graphql} from 'react-apollo';
import ConvertablePropTypes from '../util/ConvertablePropTypes';
import {idBlockFromPropTypes, simpleQuery} from '../util/graphql';

const DocumentType = new ConvertablePropTypes(PropTypes => ({
  ...idBlockFromPropTypes(PropTypes),
  name: PropTypes.string,
  parts: PropTypes.arrayOf(PropTypes.shape({
    sourceFile: PropTypes.shape({
      ...idBlockFromPropTypes(PropTypes),
      url: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
}));

@Radium
class DocumentView extends Component {
  static propTypes = {
    data: PropTypes.shape({
      document: DocumentType.toReact(),
    }).isRequired,
  }

  render() {
    const {data: {document}} = this.props;
    if (!document) return null;
    return (
      <div>
        Document name: {document.name || '(unnamed)'}
        <div>
          Part urls: {document.parts.map(part => part.sourceFile.url).join(', ')}
        </div>
        <Link to={`/documents/${document.id}/edit`}>Edit</Link>
      </div>
    );
  }
}

const DocumentViewWithData = graphql(
  simpleQuery({document: DocumentType}, {id: 'String!'}),
  {
    options: ({params: {id}}) => ({variables: {id}})
  },
)(DocumentView);

export default DocumentViewWithData;

