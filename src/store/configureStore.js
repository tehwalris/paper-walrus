import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistState} from 'redux-devtools';
import * as reducers from '../reducers/index';

let createStoreWithMiddleware;

if (__DEV__) {
  createStoreWithMiddleware = compose(
    applyMiddleware(ReduxThunk),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )(createStore);
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(ReduxThunk),
  )(createStore);
}

const rootReducer = combineReducers(reducers);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
