import React, {Component} from 'react';
import Radium from 'radium';
import {omit} from 'lodash';

@Radium
export default class Button extends Component {
  render() {
    return (
      <button {...omit(this.props, 'theme')} style={this.styles.button}/>
    );
  }

  get styles() {
    const {theme: {colors, layout}} = this.props;
    return {
      button: {
        font: 'inherit',
        border: 'none',
        margin: 0,
        padding: layout.distances[2],
        color: colors.default.content,
        backgroundColor: colors.default.raisedBackground,
        ':hover': {backgroundColor: colors.default.highlightBackground},
        ':focus': {
          outlineColor: colors.default.content,
          outlineWidth: layout.borderWidths[1],
          outlineStyle: 'solid',
        },
      },
    };
  }
}
