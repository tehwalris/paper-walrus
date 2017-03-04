import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import configureStore from './store/configureStore';
import {apiBaseUrl} from './util/apiConfig';
import Api from './Api';

export const store = configureStore();
export const history = syncHistoryWithStore(browserHistory, store);
export const api = new Api(apiBaseUrl);
