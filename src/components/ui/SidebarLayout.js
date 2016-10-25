import React, {Component, PropTypes} from 'react';
import {Block} from 'rebass';

export default class SidebarLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const [sidebarChild, ...otherChildren] = React.Children.toArray(this.props.children);
    return (
    <div style={this.styles.outerWrapper}>
      <div style={this.styles.sidebarWrapper}>{sidebarChild}</div>
      <div style={this.styles.restWrapper}>{otherChildren}</div>
    </div>
    );
  }

  get styles() {
    const {theme: {colors, layout}} = this.props;
    return {
      outerWrapper: {
        display: 'flex',
        flexDirection: 'row',
      },
      sidebarWrapper: {
        width: '350px',
      },
      restWrapper: {
        flexGrow: '1',
      },
    };
  }
}
