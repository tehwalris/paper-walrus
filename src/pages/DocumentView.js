import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {Link} from 'react-router';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import ConvertablePropTypes from '../util/ConvertablePropTypes';
import {idBlockFromPropTypes} from '../util/graphql';

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
    const styles = this.getStyles();
    if (!document) return null;
    return (
      <div>
        Document name: {document.name || '(unnamed)'}
        {this.renderParts(document.parts)}
        <Link to={`/documents/${document.id}/edit`}>Edit</Link>
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

const DocumentViewWithData = graphql(
  gql`
  query($id: String!) {
    document(id: $id) {
      ${DocumentType.toGraphql()}
    }
  }
  `,
  {options: ({params: {id}}) => ({
    variables: {id},
  })}
)(DocumentView);

export default DocumentViewWithData;

