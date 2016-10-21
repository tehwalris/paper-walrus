import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {Block} from 'rebass';

const paddingProps = ['p', 'px', 'py', 'pl', 'pr', 'pt', 'pb'];
const outerPaddings = _.fromPairs(paddingProps.map(propName => [propName, 0]));

@Radium
export default class MenuListItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    style: PropTypes.object.isRequired,
  };

  static defaultProps = {
    m: 0,
    p: 1,
    style: {}
  }

  render() {
    const innerPaddings = _.pick(this.props, paddingProps);
    return (
      <Block {...this.props} {...outerPaddings}>
        <div style={this.styles.innerWrapper}>
          <Block {...innerPaddings} m={0}>
          {this.props.children}
          </Block>
        </div>
      </Block>
    );
  }

  get styles() {
    const {onClick} = this.props;
    return {
      innerWrapper: {
        ':hover': {
          backgroundColor: onClick ? 'yellow' : undefined,
        },
      },
    };
  }
}
