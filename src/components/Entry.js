import React, {Component} from 'react';
import Radium from 'radium';
import ContentPreview from './ContentPreview';

@Radium
export default class Entry extends Component {
  static propTypes = {
    entry: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
  }

  render() {
    const {entry, style} = this.props;
    const styles = this.getStyles();
    return (
      <div style={[styles.wrapper, style]}>
        <ContentPreview data={entry.data} style={styles.preview}/>
        <div>Tags: {JSON.stringify(entry.tags)}</div>
      </div>
    );
  }

  getStyles() {
    return {
      wrapper: {
        backgroundColor: 'green',
      },
      preview: {
        width: '100%',
      },
    };
  }
}

