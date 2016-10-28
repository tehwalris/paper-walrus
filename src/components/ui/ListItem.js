import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {listContextKey} from './List';

@Radium
export default class ListItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    theme: PropTypes.object.isRequired,
    onClick: PropTypes.func,
  };

  static contextTypes = {
    [listContextKey]: PropTypes.shape({
      itemMaxWidth: PropTypes.string.isRequired,
    }),
  };

  render() {
    const {onClick} = this.props;
    return (
      <div style={this.styles.wrapper} onClick={onClick}>
        {this.props.children}
      </div>
    );
  }

  get styles() {
    const {theme: {colors, layout}, onClick} = this.props;
    const {itemMaxWidth} = this.context[listContextKey];
    return {
      wrapper: {
        maxWidth: itemMaxWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: layout.distances[2],
        ':hover': {
          backgroundColor: onClick ? colors.default.highlightBackground : undefined,
        },
      },
    };
  }
}
