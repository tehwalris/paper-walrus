import React, {Component} from 'react';
import Radium from 'radium';
import CardWrapper from './CardWrapper';
import ContentPreview from '../ContentPreview';

@Radium
export default class ImageCard extends Component {
  static propTypes = {
    imageUrl: React.PropTypes.string,
    style: React.PropTypes.object,
  }

  render() {
    const {imageUrl, children, style, ...otherProps} = this.props;
    const styles = this.getStyles();
    return (
      <CardWrapper style={style} {...otherProps}>
        {imageUrl && <ContentPreview imageUrl={imageUrl} style={styles.preview}/>}
        <div>{children}</div>
      </CardWrapper>
    );
  }

  getStyles() {
    return {
      preview: {
        width: '100%',
        height: '1px',
        flexGrow: 1,
        flexShrink: 1,
      },
    };
  }
}


