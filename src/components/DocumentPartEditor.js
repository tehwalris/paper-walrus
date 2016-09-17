import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {withRouter} from 'react-router';
import ConvertablePropTypes from '../util/ConvertablePropTypes';
import {idBlockFromPropTypes} from '../util/graphql';
import TerribleRenameControl from '../components/TerribleRenameControl';

const DocumentPartType = new ConvertablePropTypes(PropTypes => ({
  ...idBlockFromPropTypes(PropTypes),
  sourceFile: PropTypes.shape({
    ...idBlockFromPropTypes(PropTypes),
    url: PropTypes.string.isRequired,
  }).isRequired,
}));

@Radium
export default class DocumentPartEditor extends Component {
  static DocumentPartType = DocumentPartType;

  static propTypes = {
    parts: PropTypes.arrayOf(DocumentPartType.toReact()).isRequired,
    createDocumentPart: PropTypes.func.isRequired,
    style: PropTypes.object,
  }

  render() {
    const {parts, createDocumentPart, style} = this.props;
    return (
      <div style={[this.styles.wrapper, style]}>
        Document parts: <br/>
        {JSON.stringify(parts)}
        <div>
          <a onClick={() => createDocumentPart({sourceFileId: '100'})}>
            [create test part]
          </a>
        </div>
      </div>
    );
  }

  get styles() {
    return {
      wrapper: {
        backgroundColor: 'green',
        color: 'white',
        padding: '3px',
      }
    };
  }
}
