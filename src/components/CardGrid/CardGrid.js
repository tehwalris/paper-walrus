import React, {Component} from 'react';
import Radium from 'radium';
import media from '../../util/mediaQueries';

@Radium
export default class CardGrid extends Component {
  static propTypes = {
    style: React.PropTypes.object,
  }

  render() {
    const {children, style} = this.props;
    const styles = this.getStyles();
    return (
      <div style={[styles.wrapper, style]}>
        {children}
      </div>
    );
  }

  getStyles() {
    return {
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        [media.mobileL]: {
          justifyContent: 'space-around',
        },
      },
    };
  }
}

