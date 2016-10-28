import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {propType as themePropType} from './themeProps';

@Radium
export default class ListItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    theme: themePropType,
  };

  render() {
    return (
      <div style={this.styles.wrapper}>
        {this.props.children}
      </div>
    );
  }

  get styles() {
    const {theme: {layout}} = this.props;
    return {
      wrapper: {
        padding: layout.distances[1],
      },
    };
  }
}
