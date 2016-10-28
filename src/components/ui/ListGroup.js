import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class ListGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
  };

  render() {
    const {label} = this.props;
    return (
      <div style={this.styles.wrapper}>
        <div style={this.styles.label}>{label}</div>
        <hr style={this.styles.separator}/>
        {this.props.children}
      </div>
    );
  }

  get styles() {
    const {theme: {colors, layout}, onClick} = this.props;
    return {
      wrapper: {
        marginTop: layout.distances[2],
        marginBottom: layout.distances[2],
      },
    };
  }
}
