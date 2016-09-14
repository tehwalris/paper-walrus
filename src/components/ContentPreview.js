import React, {Component} from 'react';
import Radium from 'radium';
import resolveSources from '../util/resolveSources';

@Radium
export default class ContentPreview extends Component {
  static propTypes = {
    imageUrl: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
  }

  render() {
    const {imageUrl, style} = this.props;
    const styles = this.getStyles();
    return (
      <img src={imageUrl} style={[styles.image, style]}/>
    );
  }

  getStyles() {
    return {
      image: {
        objectFit: 'cover',
      },
    };
  }
}
