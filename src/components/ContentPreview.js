import React, {Component} from 'react';
import Radium from 'radium';
import resolveSources from '../util/resolveSources';

@Radium
export default class ContentPreview extends Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
  }

  render() {
    const {data, style} = this.props;
    const {preview} = resolveSources(data);
    const styles = this.getStyles();
    if (!preview) return <div style={style}>No preview.</div>;
    return (
      <img src={preview} style={[styles.image, style]}/>
    );
  }

  getStyles() {
    return {
      image: {
        objectFit: 'none',
      },
    };
  }
}
