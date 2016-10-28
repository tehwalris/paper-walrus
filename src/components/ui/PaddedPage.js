import React, {Component, PropTypes} from 'react';
import {ThemedArea} from './index';

export default class PaddedPage extends Component {
  static propTypes = {
    defaultColorSet: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
  };

  render() {
    const {defaultColorSet, children} = this.props;
    return (
      <ThemedArea defaultColorSet={defaultColorSet} style={this.styles.wrapper}>
        {children}
      </ThemedArea>
    );
  }

  get styles() {
    const {theme: {layout}} = this.props;
    return {
      wrapper: {
        width: '100%', //HACK
        paddingTop: layout.distances[3],
        paddingBottom: layout.distances[3],
        paddingLeft: layout.distances[3],
        paddingRight: layout.distances[3],
      },
    };
  }
}
