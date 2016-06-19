import Api from '../Api';

const api = new Api('/api', {
  transports: ['websocket']
});

export function initialize() {
  return function (dispatch, getState) {
    dispatch(loadTags());
    dispatch(search([]));
  }
}

export function loadTags() {
  return function (dispatch) {
    api.getTags().then(tags => dispatch({type: 'loadTags', tags}));
  };
}

export function search(tags) {
  return function (dispatch) {
    dispatch({type: 'setQuery', query: {tags}});
    dispatch(loadSearchResults({tags}));
  };
}

function loadSearchResults(options) {
  return function (dispatch) {
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

//TODO
/*
function uploadImage(image, tagIds) {
  return function (dispatch) {
    api.uploadImage(image, tagIds)
    .then(id => console.log('upload complete', id))
    .catch(e => console.error(e));
  }
}
*/
