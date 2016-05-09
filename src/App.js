import React, {Component} from 'react';
import Test from './components/Test';

export default class App extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div>
        Walrus!!!
        <Test/>
      </div>
    );
  }
}
