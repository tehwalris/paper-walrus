import React, {Component, PropTypes} from 'react';

export const listContextKey = 'paper-walris-list-context';
export const listContextType = PropTypes.shape({
  itemMaxWidth: PropTypes.string.isRequired,
});

export default class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    theme: PropTypes.object,
  };

  static childContextTypes = {
    [listContextKey]: PropTypes.shape({
      itemMaxWidth: PropTypes.string,
    }),
  };

  getChildContext() {
    return {[listContextKey]: {
      itemMaxWidth: this.props.theme.layout.listItemMaxWidths.default,
    }};
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

