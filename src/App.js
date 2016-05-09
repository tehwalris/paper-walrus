import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Home from './pages/Home';

export default class App extends Component {
  static propTypes = {}

  render() {
    const store = configureStore();
    return (
      <div>
        <Provider store={store}>
          <Home/>
        </Provider>
      </div>
    );
  }
}
