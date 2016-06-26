import Api from '../Api';
import {apiBaseUrl} from '../util/apiConfig';
import {history} from '../common';

const api = new Api(apiBaseUrl);

const getToken = state => state.user.token;

function loadSearchResults(options) {
  return (dispatch, getState) => {
    const token = getToken(getState());
    api.getEntries(options, token).then(entries => {
      dispatch({type: 'loadEntries', entries});
      requestAnimationFrame(() => {requestAnimationFrame(() => { // HACK ensure load indicators are painted
        dispatch({
          type: 'loadSearchResults',
          query: options,
          results: entries.map(entry => entry.id),
        });});
      });
    });
  };
}

export function search(tags) {
  return (dispatch) => {
    dispatch({type: 'setQuery', query: {tags}});
    dispatch(loadSearchResults({tags}));
  };
}

export function loadTags() {
  return (dispatch, getState) => {
    const token = getToken(getState());
    api.getTags(token).then(tags => dispatch({type: 'loadTags', tags}));
  };
}

export function createTag(tagInfo, cb) {
  // cb(err, tag)
  return (dispatch, getState) => {
    const token = getToken(getState());
    api.createTag(tagInfo, token).then(tag => {
      cb(null, tag);
      dispatch({type: 'loadExtraTag', tag});
    }).catch(cb);
  };
}

export function loadEntryIfRequired(id) {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.data.entries[id]) {
      const token = getToken(state);
      api.getEntry({id}, token).then(entry => dispatch({type: 'loadEntries', entries: [entry]}));
    }
  };
}

export function uploadAndCreateEntries(files, cb) {
  // cb(err, entries)
  return (dispatch, getState) => {
    const token = getToken(getState());
    const dateReceived = (new Date()).toISOString();
    api.createEntryData(files, event => console.log(event), token)
      .then(allEntryData => Promise.all(allEntryData.map(entryData => {
        return api.createEntry({
          dataId: entryData.id,
          tags: [],
          dateReceived,
        }, token);
      })))
      .then(entries => {
        cb(null, entries);
        dispatch({type: 'loadEntries', entries});
      })
      .catch(cb);
  };
}

const updatableEntryFields = ['tags', 'dateReceived'];
export function updateEntry(newEntry) {
  return (dispatch, getState) => {
    const state = getState();
    const token = getToken(state);
    const oldEntry = state.data.entries[newEntry.id];
    const changedFields = _.filter(updatableEntryFields, field => newEntry[field] !== oldEntry[field]);
    const updateRequest = _.zipObject(changedFields, _.map(changedFields, field => newEntry[field]));
    api.updateEntry({...updateRequest, id: newEntry.id}, token)
      .then(entry => dispatch({type: 'loadEntries', entries: [entry]}));
  };
}

export function deleteEntry(id) {
  return (dispatch, getState) => {
    const token = getToken(getState());
    api.deleteEntry({id}, token).then(() => dispatch({type: 'unloadEntries', entryIds: [id]}));
  };
}

function postLogin() {
  return (dispatch) => {
    history.push('/');
    dispatch(loadTags());
    dispatch(search([]));
  };
}

export function login(options, cb) {
  return (dispatch) => {
    api.authenticate(options).then(token => {
      dispatch({type: 'reset'});
      dispatch({
        type: 'login',
        email: options.email,
        token,
      });
      dispatch(postLogin());
      cb();
    }).catch(err => cb(err));
  };
}

export function logout() {
  history.push('/login');
  return {type: 'reset'};
}
