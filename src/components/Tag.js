import React, {Component} from 'react';
import Radium from 'radium';

@Radium
export default class Tag extends Component {
  static propTypes = {
    tagId: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
  }

  static contextTypes = {
    tags: React.PropTypes.object.isRequired,
  }

  render() {
    const {tagId, style} = this.props;
    const tag = this.context.tags[tagId];
    if(!tag) return <div/>;
    const styles = this.getStyles();
    return (
      <div style={[styles.tag, style]}>
        {tag.name}
      </div>
    );
  }

  getStyles() {
    return {
      tag: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '50px',
        height: '22px',
        padding: '3px 4px',
        borderRadius: '11px',
        border: '1px solid blue',
      },
    };
  }
}


