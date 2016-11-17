import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {DragDropContext} from 'react-dnd';
import Html5Backend from 'react-dnd-html5-backend';
import SourceFileUploadGrid from './SourceFileUploadGrid';
import DocumentPartInfo from './DocumentPartInfo';
import CreateDocumentPartMutation from '../mutations/CreateDocumentPartMutation';
import DeleteDocumentPartMutation from '../mutations/DeleteDocumentPartMutation';
import MoveDocumentPartMutation from '../mutations/MoveDocumentPartMutation';

@DragDropContext(Html5Backend)
@Radium
class DocumentPartEditor extends Component {
  static propTypes = {
    document: PropTypes.object.isRequired,
    sourceFiles: PropTypes.array.isRequired,
    style: PropTypes.object,
  }

  render() {
    const {document, sourceFiles, style} = this.props;
    return (
      <div style={[this.styles.wrapper, style]}>
        <div style={this.styles.partList}>
          {document.parts.map((part, i) => (
          <DocumentPartInfo
            key={i}
            part={part}
            onDelete={() => this.deleteDocumentPart(part)}
            onMove={this.moveDocumentPart}
            style={this.styles.part}
          />
          ))}
        </div>
        <SourceFileUploadGrid
          sourceFiles={sourceFiles}
          onSourceFileClick={this.createDocumentPart}
          style={this.styles.sourceFileGrid}
        />
      </div>
    );
  }

  createDocumentPart = (sourceFileFromUploadGrid) => {
    const {document, relay} = this.props;
    // HACK since the source file from the upload grid component does not have the right fragment
    const sourceFile = _.find(this.props.sourceFiles, ['__dataID__', sourceFileFromUploadGrid.__dataID__]);
    relay.commitUpdate(new CreateDocumentPartMutation({document, sourceFile}));
  }

  deleteDocumentPart = (part) => {
    const {relay} = this.props;
    relay.commitUpdate(new DeleteDocumentPartMutation({part}));
  }

  moveDocumentPart = (partId, targetPartId, relativePlacement) => {
    const {relay} = this.props;
    const oldPosition = _.findIndex(this.props.document.parts, ['id', partId]);
    const targetPartPosition = _.findIndex(this.props.document.parts, ['id', targetPartId]);
    relay.commitUpdate(new MoveDocumentPartMutation({
      part: this.props.document.parts[oldPosition],
      targetPosition: targetPartPosition + (relativePlacement === 'before' ? 0 : 1),
    }));
  }

  get styles() {
    return {
      wrapper: {
        display: 'flex',
        backgroundColor: 'green',
      },
      partList: {
        flex: '50% 1 1',
        overflow: 'hidden',
        borderRight: '2px solid pink',
      },
      sourceFileGrid: {
        flex: '50% 1 1',
        overflow: 'hidden',
      },
      part: {
        margin: '10px',
      },
    };
  }
}

export default Relay.createContainer(DocumentPartEditor, {
  fragments: {
    document: () => Relay.QL`
      fragment on Document {
        parts {
          id
          ${DocumentPartInfo.getFragment('part')}
          ${DeleteDocumentPartMutation.getFragment('part')}
          ${MoveDocumentPartMutation.getFragment('part')}
        }
        ${CreateDocumentPartMutation.getFragment('document')}
      }
    `,
    sourceFiles: () => Relay.QL`
      fragment on SourceFile @relay(plural: true) {
        ${SourceFileUploadGrid.getFragment('sourceFiles')}
        ${CreateDocumentPartMutation.getFragment('sourceFile')}
      }
    `,
  },
});
