import React, {Component} from 'react';
import Test from '../components/Test';

export default class Home extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div>
        Walrus!
        The home page.
        <Test/>
      </div>
    );
  }
}
