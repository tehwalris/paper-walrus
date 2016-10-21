import React, {Component} from 'react';
import {Block} from 'rebass';

export default class CardBlock extends Component {
  static propTypes = Block.propTypes;
  static defaultProps = Block.defaultProps;

  render() {
    return <Block p={1} {...this.props} style={{...this.styles.base, ...this.props.style}}/>
  }

  styles = {
    base: {
      borderWidth: '1px',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
      borderBottomStyle: 'solid',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      backgroundColor: 'rgb(252, 252, 252)',
    },
  }
}
