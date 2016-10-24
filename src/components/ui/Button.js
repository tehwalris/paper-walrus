import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class Button extends Component {
  render() {
    return (
      <div style={this.styles.wrapper}>
        Pretend this is a button.
      </div>
    );
  }

  get styles() {
    const {theme: {colors, layout}} = this.props;
    return {
      wrapper: {
        display: 'inline-block',
        padding: layout.distances[2],
        backgroundColor: colors.background,
      },
    };
  }
}
