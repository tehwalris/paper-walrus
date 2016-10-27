import React, {Component, PropTypes} from 'react';
import {Block} from 'rebass';

export default class List extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}

