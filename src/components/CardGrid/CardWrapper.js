import React, {Component} from 'react';
import Radium from 'radium';
import media from '../../util/mediaQueries';

@Radium
export default class CardWrapper extends Component {
  static propTypes = {
    style: React.PropTypes.object,
  }

  render() {
    const {children, style, ...otherProps} = this.props;
    const styles = this.getStyles();
    return (
      <div style={[styles.wrapper, style]} {...otherProps}>
        {children}
      </div>
    );
  }

  getStyles() {
    return {
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'yellow',
        boxSizing: 'border-box',
        width: '200px',
        height: '200px',
        margin: '10px',
        border: '1px solid blue',
        [media.tablet]: {
          width: '180px',
          height: '180px',
          margin: '5px',
        },
        [media.mobileL]: {
          width: '45vw',
          margin: '5px 0',
        },
        [media.mobileS]: {
          width: '95vw',
        },
      },
    };
  }
}

