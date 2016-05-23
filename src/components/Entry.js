import React, {Component} from 'react';
import Radium from 'radium';
import ContentPreview from './ContentPreview';
import Tag from './Tag';

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
        <div style={styles.tagContainer}>
          {entry.tags.map((tagId, i) => (
          <Tag
            key={i}
            tagId={tagId}
            style={styles.tag}
          />
          ))}
        </div>
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
      tagContainer: {
        padding: '5px',
      },
      tag: {
        margin: '5px',
      },
    };
  }
}

