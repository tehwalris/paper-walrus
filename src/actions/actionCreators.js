import Api from '../Api';
import {apiBaseUrl} from '../util/apiConfig';

const api = new Api(apiBaseUrl);

function loadSearchResults(options) {
  return (dispatch) => {
    api.getEntries(options).then(entries => {
      dispatch({
        type: 'loadSearchResults',
        query: options,
        results: entries.map(entry => entry.id),
      });
      dispatch({type: 'loadEntries', entries});
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
  return (dispatch) => {
    api.getTags().then(tags => dispatch({type: 'loadTags', tags}));
  };
}

export function loadEntryIfRequired(id) {
  return (dispatch, getState) => {
    if (!getState().data.entries[id])
      api.getEntry({id}).then(entry => dispatch({type: 'loadEntries', entries: [entry]}));
  };
}

function createDefaultEntry(entryData) {
  const dateReceived = (new Date()).toISOString();
  console.log(entryData);
  return api.createEntry({
    dataId: entryData.id,
    tags: [],
    dateReceived,
  });
}

export function uploadAndCreateEntries(files, cb) {
  // cb(err, entries)
  return (dispatch) => {
    api.createEntryData(files)
      .then(allEntryData => Promise.all(allEntryData.map(createDefaultEntry)))
      .then(entries => {
        cb(null, entries);
        dispatch({type: 'loadEntries', entries});
      })
      .catch(cb);
  };
}

export function initialize() {
  return (dispatch) => {
    dispatch(loadTags());
  };
}
