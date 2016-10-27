import React, {Component, PropTypes} from 'react';
import * as themePropInfo from './themeProps';

export default class ThemedArea extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    defaultColorSet: PropTypes.string.isRequired,
    style: PropTypes.object,
    children: PropTypes.node,
  };
  static childContextTypes = {
    [themePropInfo.contextKey]: themePropInfo.propType,
  };

  getChildContext() {
    return {[themePropInfo.contextKey]: this.getChildTheme()};
  }

  render() {
    const {children} = this.props;
    return <div style={this.styles.wrapper}>{children}</div>;
  }

  getChildTheme() {
    const {theme, defaultColorSet} = this.props;
    return {
      ...theme,
      colors: {
        ...theme.colors,
        default: theme.colors[defaultColorSet],
      },
    };
  }

  get styles() {
    const {style} = this.props;
    const childTheme = this.getChildTheme();
    return {
      wrapper: {
        backgroundColor: childTheme.colors.default.background,
        color: childTheme.colors.default.content,
        ...(style || {}),
      },
    };
  }
}

