import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './store/configureStore';
import Home from './pages/Home';

export default class App extends Component {
  static propTypes = {}

  render() {
    const store = configureStore();
    const history = syncHistoryWithStore(browserHistory, store);
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={Home}>
          </Route>
        </Router>
      </Provider>
    );
  }
}
