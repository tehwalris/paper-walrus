import React, {Component, PropTypes} from 'react';
import {Block} from 'rebass';

export default class MenuList extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return <Block {...this.props} />;
  }
}
