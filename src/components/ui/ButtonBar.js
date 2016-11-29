import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class ButtonBar extends Component {
  static propTypes = {
    children: PropTypes.node,
    theme: PropTypes.object,
  }

  render() {
    return (
      <div style={this.styles.outerWrapper}>
        {React.Children.map(this.props.children, child => 
          <div style={this.styles.buttonWrapper}>{child}</div>
        )}
      </div>
    );
  }

  get styles() {
    const {theme: {layout}} = this.props;
    return {
      outerWrapper: {
        paddingLeft: layout.distances[2],
      },
      buttonWrapper: {
        paddingRight: layout.distances[2],
      },
    };
  }
}
