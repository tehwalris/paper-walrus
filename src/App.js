import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect} from 'react-router';
import {StyleRoot} from 'radium';
import {ApolloProvider} from 'react-apollo';
import {apolloClientFromStore} from './apolloClient';
import ParentPage from './pages/ParentPage';
import DocumentList from './pages/DocumentList';
import DocumentView from './pages/DocumentView';
import SourceFileList from './pages/SourceFileList';
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
        <ApolloProvider store={store} client={apolloClientFromStore(store)}>
          <StyleRoot>
            <Router key={routerKey} history={history}>
              <Route path='/' component={ParentPage}>
                <IndexRedirect to='documents'/>
                <Route path='documents' component={DocumentList} onEnter={this.forceAuth}/>
                <Route path='documents/:id' component={DocumentView} onEnter={this.forceAuth}/>
                <Route path='sourceFiles' component={SourceFileList} onEnter={this.forceAuth}/>
                <Route path='login' component={Login}/>
              </Route>
            </Router>
          </StyleRoot>
        </ApolloProvider>
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
