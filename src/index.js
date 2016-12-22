import '!file-loader?name=[name].[ext]!./index.html';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './App';
import {store, history} from './common';
import './util/injectRelayNetworkLayer'

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
