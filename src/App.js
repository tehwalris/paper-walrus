import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router'
import ParentPage from './pages/ParentPage';
import Home from './pages/Home';
import EntryDetail from './pages/EntryDetail';

export default class App extends Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired,
    routerKey: React.PropTypes.string, // HACK prevent warnings with hot reload
  }

  render() {
    const {store, history, routerKey} = this.props;
    return (
      <Provider store={store}>
        <Router key={routerKey} history={history}>
          <Route path='/' component={ParentPage}>
            <IndexRoute component={Home}/>
            <Route path='detail/:id' component={EntryDetail}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
