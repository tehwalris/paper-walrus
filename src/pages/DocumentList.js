import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {Link} from 'react-router';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

@Radium
class DocumentList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      documents: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
      loading: React.PropTypes.bool,
    }).isRequired,
  }

  render() {
    const {data: {documents, loading}} = this.props;
    const styles = this.getStyles();
    if (loading)
      return null;
    if (_.isEmpty(documents))
      return (<div>No documents available.</div>);
    return (
      <div>
        <ul>
        {documents.map(this.renderItem)}
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

const DocumentListWithData = graphql(
  gql`
  query {
    documents {
      id
      __typename
      name
    }
  }
  `,
)(DocumentList);

export default DocumentListWithData;
