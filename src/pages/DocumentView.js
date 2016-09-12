import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

@Radium
class DocumentView extends Component {
  static propTypes = {
    data: PropTypes.shape({
      document: PropTypes.shape({
        name: PropTypes.string,
        parts: PropTypes.arrayOf(PropTypes.shape({
          sourceFile: PropTypes.shape({
            filename: PropTypes.string.isRequired,
          }).isRequired,
        })).isRequired,
      }),
    }).isRequired,
  }

  render() {
    const {data: {document}} = this.props;
    const styles = this.getStyles();
    if (!document)
      return (<div>Document not loaded</div>);
    return (
      <div>
        Document name: {document.name || '(unnamed)'}
        {this.renderParts(document.parts)}
      </div>
    );
  }

  renderParts = (parts) => {
    return (
      <div>
        Part filenames: {parts.map(part => part.sourceFile.filename).join(', ')}
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
      name
      parts {
        sourceFile {
          filename
        }
      }
    }
  }
  `,
  {options: ({params: {id}}) => ({
    variables: {id},
  })}
)(DocumentView);

export default DocumentViewWithData;

