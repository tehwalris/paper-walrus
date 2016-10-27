import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import LinkBlock from '../LinkBlock';

@Radium
export default class NavOverlay extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    logoText: PropTypes.string.isRequired,
  };

  render() {
    const {logoText} = this.props;
    return (
      <div style={this.styles.wrapper}>
        <LinkBlock to="/" style={this.styles.logoLink}>
          <div style={this.styles.logo}>
            {logoText}
          </div>
        </LinkBlock>
      </div>
    );
  }

  get styles() {
    const {theme: {colors, layout}} = this.props;
    return {
      wrapper: {
        position: 'absolute',
        display: 'flex',
        top: 0,
        left: 0,
        height: layout.navReservedArea.height,
        width: layout.navReservedArea.width,
      },
      logoLink: {
        display: 'flex',
      },
      logo: {
        display: 'flex',
        alignItems: 'center',
        margin: layout.distances[2],
        padding: layout.distances[2],
        fontSize: layout.logoFontSize,
        backgroundColor: colors.primary.background,
        color: colors.primary.content,
        ':hover': {backgroundColor: colors.primary.highlightBackground},
      },
    };
  }
}
