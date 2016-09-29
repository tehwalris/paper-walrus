import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect, applyRouterMiddleware} from 'react-router';
import {StyleRoot} from 'radium';
import Relay from 'react-relay';
import ReactRouterRelay from 'react-router-relay';
import ParentPage from './pages/ParentPage';
import DocumentList from './pages/DocumentList';
import DocumentView from './pages/DocumentView';
import DocumentEdit from './pages/DocumentEdit';
import SourceFileList from './pages/SourceFileList';
import TagBrowser from './pages/TagBrowser';
import Login from './pages/Login';

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

const DocumentQueries = {
  document: () => Relay.QL`query { node (id: $id) }`,
};

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
          <Router
            key={routerKey}
            history={history}
            render={applyRouterMiddleware(ReactRouterRelay.default)}
            environment={Relay.Store}
          >
            <Route path='/' component={ParentPage}>
              <IndexRedirect to='documents'/>
              <Route
                path='documents'
                component={DocumentList}
                queries={ViewerQueries}
                onEnter={this.forceAuth}
              />
              <Route
                path='documents/:id'
                component={DocumentView}
                queries={DocumentQueries}
                onEnter={this.forceAuth}
              />
              <Route
                path='documents/:id/edit'
                component={DocumentEdit}
                queries={{...ViewerQueries, ...DocumentQueries}}
                onEnter={this.forceAuth}
              />
              <Route
                path='sourceFiles'
                component={SourceFileList}
                queries={ViewerQueries}
                onEnter={this.forceAuth}
              />
              <Route
                path='tags'
                component={TagBrowser}
                queries={ViewerQueries}
                onEnter={this.forceAuth}
              />
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
