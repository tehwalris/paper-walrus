import React, {Component, PropTypes} from 'react';
import {FormElement} from './index';
import {omit} from 'lodash';

export default class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <form {...omit(this.props, 'theme')} style={this.styles.form}>
        {React.Children.map(this.props.children, child => (
        <FormElement>{child}</FormElement>
        ))}
      </form>
    );
  }

  get styles() {
    const {theme: {layout}} = this.props;
    return {
      form: {
        width: layout.formWidth,
      },
    };
  }
}

