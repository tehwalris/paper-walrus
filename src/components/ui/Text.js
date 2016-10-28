import React, {Component, PropTypes} from 'react';
import {omit} from 'lodash';

export default class Heading extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
  }

  render() {
    const {level} = this.props;
    return <div {...omit(this.props, ['theme'])} style={this.styles.wrapper}/>;
  }

  get styles() {
    const {theme: {layout}} = this.props;
    return {
      wrapper: {
        marginTop: layout.distances[0],
        marginBottom: layout.distances[2],
      },
    };
  }
}

