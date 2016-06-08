import React, {Component} from 'react';
import Radium from 'radium';
import Entry from './Entry';

@Radium
export default class FullscreenView extends Component {
  static propTypes = {
    entry: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
  }

  render() {
    const {entry, style} = this.props;
    const styles = this.getStyles();
    return (
      <div style={[styles.wrapper, style]}>
        <Entry
          entry={entry}
          style={styles.entry}
        />
      </div>
    );
  }

  getStyles() {
    return {
      wrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      },
      entry: {
        width: '100%',
        height: '100%',
        flexGrow: 1,
        flexShrink: 1,
      },
    };
  }
}


