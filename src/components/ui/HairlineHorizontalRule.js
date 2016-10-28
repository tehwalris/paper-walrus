import React, {Component, PropTypes} from 'react';
import getRes from '../../util/getRes';

export default class HairlineHorizontalRule extends Component {
  static propTypes
  render() {
    return <div style={this.styles.hairline}>&nbsp;</div>;
  }

  get styles() {
    return {
      hairline: {
        height: '1px',
        width: '100%',
        overflow: 'hidden',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: 'inherit',
        transform: `scaleY(${1 / getRes().dppx})`,
      },
    };
  }
}

