import React, {Component, PropTypes} from 'react';
import {Block} from 'rebass';
import Radium from 'radium';

@Radium
export default class ListItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
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
    return {
      wrapper: {
        padding: layout.distances[2],
        ':hover': {
          backgroundColor: onClick ? colors.highlightBackground : undefined,
        },
      },
    };
  }
}
