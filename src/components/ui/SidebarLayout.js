import React, {Component, PropTypes} from 'react';
import {ThemedArea} from './index';

export default class SidebarLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    sidebarColorSet: PropTypes.string.isRequired,
    contentColorSet: PropTypes.string.isRequired,
  };

  render() {
    const {sidebarColorSet, contentColorSet} = this.props;
    const [sidebarChild, ...otherChildren] = React.Children.toArray(this.props.children);
    return (
    <div style={this.styles.outerWrapper}>
      <ThemedArea defaultColorSet={sidebarColorSet} style={this.styles.sidebarWrapper}>
        {sidebarChild}
      </ThemedArea>
      <ThemedArea defaultColorSet={contentColorSet} style={this.styles.contentWrapper}>
        {otherChildren}
      </ThemedArea>
    </div>
    );
  }

  get styles() {
    const {theme: {colors, layout}} = this.props;
    return {
      outerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%', //HACK
      },
      sidebarWrapper: {
        width: layout.sidebarWidth,
      },
      contentWrapper: {
        flexGrow: '1',
      },
    };
  }
}
