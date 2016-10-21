import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class SidePanelLayout extends Component {
  static propTypes = {
    sidePanelWidth: PropTypes.string.isRequired,
    gutterWidth: PropTypes.string.isRequired,
  };

  static defaultProps = {
    sidePanelWidth: '350px',
    gutterWidth: '20px',
  };

  render() {
    const [sidePanelChild, ...otherChildren] = React.Children.toArray(this.props.children);
    return (
      <div style={this.styles.outerWrapper}>
        <div style={this.styles.sidePanelWrapper}>
          {sidePanelChild}
        </div>
        <div style={this.styles.restWrapper}>
          {otherChildren}
        </div>
      </div>
    );
  }

  get styles() {
    return {
      outerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        ...this.props.style,
      },
      sidePanelWrapper: {
        width: this.props.sidePanelWidth,
        marginRight: this.props.gutterWidth,
      },
      restWrapper: {
        flexGrow: 1,
      },
    };
  }
}
