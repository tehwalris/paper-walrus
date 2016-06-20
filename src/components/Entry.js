import React, {Component} from 'react';
import Radium from 'radium';
import ContentPreview from './ContentPreview';
import TagBar from './TagBar';

@Radium
export default class Entry extends Component {
  static propTypes = {
    entry: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  }

  static contextTypes = {
    tags: React.PropTypes.object.isRequired,
  }

  render() {
    const {entry, style, onClick} = this.props;
    const styles = this.getStyles();
    return (
      <div style={[styles.wrapper, style]} onClick={onClick}>
        <ContentPreview data={entry.data} style={styles.preview}/>
        <TagBar tagIds={entry.tags}/>
      </div>
    );
  }

  getStyles() {
    return {
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'green',
      },
      preview: {
        width: '100%',
        height: '1px',
        flexGrow: 1,
        flexShrink: 1,
      },
    };
  }
}

