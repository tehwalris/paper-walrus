import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {listContextKey} from './List';
import HairlineHorizontalRule from './HairlineHorizontalRule';

@Radium
export default class ListGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
  };

  static contextTypes = {
    [listContextKey]: PropTypes.shape({
      itemMaxWidth: PropTypes.string.isRequired,
    }),
  };

  render() {
    const {label} = this.props;
    return (
      <div style={this.styles.wrapper}>
        <div style={this.styles.label}>{label}</div>
        <HairlineHorizontalRule/>
        <div style={this.styles.childWrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }

  get styles() {
    const {theme: {colors, layout}, onClick} = this.props;
    const {itemMaxWidth} = this.context[listContextKey];
    return {
      wrapper: {
        marginTop: layout.distances[4],
        marginBottom: layout.distances[2],
        color: colors.default.secondaryContent,
      },
      label: {
        maxWidth: itemMaxWidth,
        paddingLeft: layout.distances[2],
        paddingRight: layout.distances[2],
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: layout.distances[2],
      },
      childWrapper: {
        marginTop: layout.distances[1],
        color: colors.default.content,
      },
    };
  }
}
