import React, {Component, PropTypes} from 'react';
import {Block} from 'rebass';

export default class List extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return <div style={this.styles.wrapper}>{this.props.children}</div>;
  }

  get styles() {
    const {theme: {colors, layout}} = this.props;
    return {
      wrapper: {
        backgroundColor: colors.default.background,
        color: colors.default.content,
      },
    };
  }
}

