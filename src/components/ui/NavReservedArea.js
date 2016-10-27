import React, {Component, PropTypes} from 'react';

export default class NavReservedArea extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
  };

  render() {
    return <div style={this.styles.wrapper}>&nbsp;</div>;
  }

  get styles() {
    const {theme: {layout}} = this.props;
    return {
      wrapper: {
        height: layout.navReservedArea.height,
        width: layout.navReservedArea.width,
      },
    };
  }
}
