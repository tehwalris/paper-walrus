import React, {Component, PropTypes} from 'react';
import {omit} from 'lodash';
import defaultTheme from './defaultTheme';
import * as themePropInfo from './themeProps';

export default function withTheme(ComponentToTheme) {
  return class ThemedComponent extends Component {
    static displayName = `withTheme(${ComponentToTheme.displayName || ComponentToTheme.name})`;
    static propTypes = {
      ...(ComponentToTheme.propTypes || {}),
      theme: themePropInfo.propType,
    };
    static contextTypes = {
      [themePropInfo.contextKey]: themePropInfo.propType,
    };

    render() {
      const restProps = omit(this.props, 'theme');
      const theme = this.context[themePropInfo.contextKey] || this.props.theme || defaultTheme;
      return <ComponentToTheme {...restProps} theme={theme}/>;
    }
  };
}
