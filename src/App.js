import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import {StyleRoot} from 'radium';
import ParentPage from './pages/ParentPage';
import Home from './pages/Home';
import EntryDetail from './pages/EntryDetail';
import Login from './pages/Login';

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
        <StyleRoot>
          <Router key={routerKey} history={history}>
            <Route path='/' component={ParentPage}>
              <IndexRoute component={Home} onEnter={this.forceAuth}/>
              <Route path='detail/:id' component={EntryDetail} onEnter={this.forceAuth}/>
              <Route path='login' component={Login}/>
            </Route>
          </Router>
        </StyleRoot>
      </Provider>
    );
  }

  forceAuth = (nextState, replace) => {
    const {store} = this.props;
    if (!store.getState().user.token) {
      const destination = {
        pathname: nextState.location.pathname,
        query: nextState.location.query,
        state: nextState.location.state,
      };
      replace({
        pathname: '/login',
        state: {destination},
      });
    }
  }
}
