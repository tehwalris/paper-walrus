import React, {Component, PropTypes} from 'react';
import {omit} from 'lodash';

export default class Heading extends Component {
  static propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4]).isRequired,
    theme: PropTypes.object.isRequired,
  }

  render() {
    const {level} = this.props;
    const HeaderComponent = `h${level}`;
    return <HeaderComponent {...omit(this.props, ['level', 'theme'])} style={this.styles.header}/>;
  }

  get styles() {
    const {level, theme: {layout}} = this.props;
    return {
      header: {
        fontSize: layout.headerFontSizes[level],
        fontWeight: 'bold',
      },
    };
  }
}

