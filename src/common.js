import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import configureStore from './store/configureStore';

export const store = configureStore();
export const history = syncHistoryWithStore(browserHistory, store);
