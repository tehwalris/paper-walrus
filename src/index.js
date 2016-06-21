import '!file?name=[name].[ext]!./index.html';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from './store/configureStore';
import {AppContainer} from 'react-hot-loader';
import App from './App';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

function renderApp(PrimaryComponent, routerKey) {
  ReactDOM.render(
    <AppContainer>
      <PrimaryComponent
        store={store}
        history={history}
        routerKey={routerKey}
      />
    </AppContainer>,
    document.getElementById('main')
  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const routerKey = Date.now().toString();
    renderApp(require('./App').default, routerKey);
  });
}
