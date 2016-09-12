import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

@Radium
class DocumentList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      documents: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
    }).isRequired,
  }

  render() {
    const {data: {documents}} = this.props;
    const styles = this.getStyles();
    if (_.isEmpty(documents))
      return (<div>No documents available.</div>);
    return (
      <div>
        <ul>
        {documents.map(this.renderDocumentListItem)}
        </ul>
      </div>
    );
  }

  renderDocumentListItem = (document, i) => {
    return (
        <li key={i}>{document.name || '(unnamed)'}</li>
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
      name
    }
  }
  `,
)(DocumentList);

export default DocumentListWithData;

