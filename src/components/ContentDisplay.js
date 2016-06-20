import React, {Component} from 'react';
import Radium from 'radium';
import resolveSources from '../util/resolveSources';

@Radium
export default class ContentDisplay extends Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
  }

  render() {
    const {data, style} = this.props;
    const {original} = resolveSources(data);
    if (data.originalType.split('/')[0].toLowerCase() === 'image')
      return this.renderImage(original);
    return <div style={style}>Unsupported content.</div>;
  }

  renderImage(url) {
    const {style} = this.props;
    const styles = this.getStyles();
    return (
      <img src={url} style={[styles.image, style]}/>
    );
  }

  getStyles() {
    return {
      image: {
        objectFit: 'contain',
      },
    };
  }
}
