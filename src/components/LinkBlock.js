import React, {Component} from 'react';
import {Link} from 'react-router';

export default class LinkBlock extends Component {
  static propTypes = Link.propTypes;
  static defaultProps = {
    ...Link.defaultProps,
    style: {},
  }

  render() {
    return <Link {...this.props} style={{...this.styles.base, ...this.props.style}}/>;
  }

  styles = {
    base: {
      display: 'block',
      color: 'inherit',
      textDecoration: 'none',
    },
  }
}
