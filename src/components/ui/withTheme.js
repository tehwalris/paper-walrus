import React, {Component, PropTypes} from 'react';
import {omit} from 'lodash';
import defaultTheme from './defaultTheme';

const themePropType = PropTypes.object;

export default function withTheme(ComponentToTheme) {
  return class ThemedComponent extends ComponentToTheme {
    static displayName = `withTheme(${ComponentToTheme})`;
    static propTypes = {
      ...(ComponentToTheme.propTypes || {}),
      theme: themePropType,
    };

    render() {
      const restProps = omit(this.props, 'theme');
      return <ComponentToTheme {...restProps} theme={defaultTheme}/>;
    }
  };
}
