import React, {Component, PropTypes} from 'react';

export default class List extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}

