import '!file?name=[name].[ext]!./index.html';
import './index.scss';

import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './store/configureStore';
import {AppContainer} from 'react-hot-loader';
import App from './App';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

renderApp(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp(require('./App').default);
  });
}

function renderApp (PrimaryComponent) {
  ReactDOM.render(
    <AppContainer>
      <PrimaryComponent
        store={store}
        history={history}
      />
    </AppContainer>,
    document.getElementById('main')
  );
}
