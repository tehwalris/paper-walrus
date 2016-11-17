import React, {Component, PropTypes} from 'react';
import { findDOMNode } from 'react-dom';
import Radium from 'radium';
import Relay from 'react-relay';
import {DragSource, DropTarget} from 'react-dnd';
import dragTypes from '../util/dragTypes';
import ContentPreview from './ContentPreview';
import { get } from 'lodash';

function getHoverVerticalHalf(monitor, component) {
  const hoverBoundingRect = component.getBoundingClientRect();
  const hoverMiddleY = hoverBoundingRect.top + (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  const clientOffset = monitor.getClientOffset();
  return (clientOffset.y < hoverMiddleY) ? 'top' : 'bottom';
}

const drag = {
  type: dragTypes.DocumentPart,
  source: {
    beginDrag(props) {
      return {id: props.part.id};
    },
  },
  target: {
    drop(props, monitor, component) {
      const overItem = monitor.getItem();
      if (props.part.id === overItem.id)
        return;
      const relativePlacement = (getHoverVerticalHalf(monitor, findDOMNode(component)) === 'top') ? 'before' : 'after';
      props.onMove(overItem.id, props.part.id, relativePlacement);
    },
  },
  collectSource: (connect) => ({
    connectDragSource: connect.dragSource(),
  }),
  collectTarget: (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    monitor: monitor,
  }),
};

@DragSource(drag.type, drag.source, drag.collectSource)
@DropTarget(drag.type, drag.target, drag.collectTarget)
@Radium
class DocumentPartInfo extends Component {
  static propTypes = {
    part: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    isOver: PropTypes.bool,
    monitor: PropTypes.object,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    style: PropTypes.object,
  }

  render() {
    const {part, onDelete, connectDragSource, connectDropTarget, style} = this.props;
    return connectDragSource(connectDropTarget(
      <div
        ref={el => {this.wrapperElement = el;}}
        onDragOver={this.onDragOver}
        style={[this.styles.wrapper, style]}
      >
        {this.renderPreview()}
        <div style={this.styles.description}>
          MIME Type: {part.sourceFile.mimeType}
          <div><a onClick={onDelete}>[delete]</a></div>
        </div>
      </div>
    ));
  }

  renderPreview() {
    const {previewUrl} = this.props.part.sourceFile;
    if (!previewUrl)
      return <div style={this.styles.preview}>(no preview)</div>;
    return (
      <ContentPreview
        imageUrl={previewUrl}
        style={this.styles.preview}
      />
    );
  }

  onDragOver = () => {
    const {isOver, monitor} = this.props;
    if (!isOver)
      return;
    this.setState({
      hoverVerticalHalf: getHoverVerticalHalf(monitor, this.wrapperElement),
    });
  }

  get styles() {
    const {isOver} = this.props;
    const {hoverVerticalHalf} = this.state;
    const hoverBackground = {
      top: 'linear-gradient(to top, blue, blueviolet)',
      bottom: 'linear-gradient(to bottom, blue, blueviolet)',
    }[hoverVerticalHalf];
    return {
      wrapper: {
        display: 'flex',
        background: isOver ? hoverBackground : 'blue',
        color: 'white',
        border: '1px solid pink',
      },
      preview: {
        width: '200px',
        height: '200px',
      },
      description: {
        flexGrow: '1',
        padding: '20px',
      },
    };
  }
}

export default Relay.createContainer(DocumentPartInfo, {
  fragments: {
    part: () => Relay.QL`
      fragment on DocumentPart {
        id
        sourceFile {
          previewUrl
          mimeType
        }
      }
    `,
  },
});
