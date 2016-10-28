import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {omit} from 'lodash';
import {Button} from './index';
import LinkBlock from '../LinkBlock';

@Radium
export default class LinkButton extends Component {
  static propTypes = {
    children: PropTypes.node,
    tabIndex: PropTypes.number,
  }

  render() {
    const {tabIndex, children} = this.props;
    return (
      <LinkBlock
        {...omit(this.props, ['theme', 'children'])}
        tabIndex="-1"
        style={this.styles.link}
      >
        <Button tabIndex={tabIndex}>{children}</Button>
      </LinkBlock>
    );
  }

  get styles() {
    return {
      link: {
        display: 'inline-block',
      },
    };
  }
}
