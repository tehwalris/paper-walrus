import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {listContextKey} from './List';
import LinkBlock from '../LinkBlock';

@Radium
export default class ListLinkItem extends Component {
  static propTypes = {
    to: PropTypes.string,
    children: PropTypes.node,
    theme: PropTypes.object.isRequired,
  };

  static contextTypes = {
    [listContextKey]: PropTypes.shape({
      itemMaxWidth: PropTypes.string.isRequired,
    }),
  };

  render() {
    const {onClick, to} = this.props;
    return (
      <div style={this.styles.outerWrapper}>
        <div style={this.styles.innerWrapper}>
          <LinkBlock style={this.styles.linkBlock} to={to}>
            {this.props.children}
          </LinkBlock>
        </div>
      </div>
    );
  }

  get styles() {
    const {theme: {colors, layout}} = this.props;
    const {itemMaxWidth} = this.context[listContextKey];
    return {
      outerWrapper: {
        maxWidth: itemMaxWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      innerWrapper: {
        ':hover': {
          backgroundColor: colors.default.highlightBackground,
        },
      },
      linkBlock: {
        padding: layout.distances[2],
      },
    };
  }
}
