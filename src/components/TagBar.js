import React, {Component} from 'react';
import Radium from 'radium';
import Tag from './Tag';

@Radium
export default class TagBar extends Component {
  static propTypes = {
    tagIds: React.PropTypes.array.isRequired,
    style: React.PropTypes.object,
  }

  static contextTypes = {
    tags: React.PropTypes.object.isRequired,
  }

  render() {
    const {tagIds, style} = this.props;
    const styles = this.getStyles();
    return (
      <div style={[styles.wrapper, style]}>
        {tagIds.map((tagId, i) => (
        <Tag
          key={i}
          tagId={tagId}
          style={styles.tag}
        />
        ))}
      </div>
    );
  }

  getStyles() {
    return {
      wrapper: {
        padding: '5px',
      },
      tag: {
        margin: '5px',
      },
    };
  }
}


