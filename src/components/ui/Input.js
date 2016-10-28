import React, {Component} from 'react';
import Radium from 'radium';
import {omit} from 'lodash';

@Radium
export default class Input extends Component {
  render() {
    return (
      <input {...omit(this.props, 'theme')} style={this.styles.input}/>
    );
  }

  get styles() {
    const {theme: {colors, layout}} = this.props;
    return {
      input: {
        boxSizing: 'border-box',
        width: '100%',
        margin: 0,
        padding: layout.distances[2],
        borderStyle: 'solid',
        borderColor: colors.default.border,
        borderWidth: layout.borderWidths[1],
        outline: 'none',
        font: 'inherit',
        color: colors.default.content,
        backgroundColor: colors.default.raisedBackground,
        ':hover': {
          backgroundColor: colors.default.highlightBackground,
        },
        ':focus': {
          backgroundColor: colors.default.highlightBackground,
        },
      },
    };
  }
}
