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
  }

  render() {
    const {store, history} = this.props;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={ParentPage}>
            <IndexRoute component={Home}/>
            <Route path='detail/:id' component={EntryDetail}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
