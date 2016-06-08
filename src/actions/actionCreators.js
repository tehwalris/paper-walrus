import Api from '../Api';

const api = new Api(':3000', {
  transports: ['websocket']
});

export function initialize() {
  return function (dispatch) {
    dispatch(loadTags());
    dispatch(search([]));
    dispatch(uploadImage('totallyAnImage', ['id1']));
  }
}

export function loadTags() {
  return function (dispatch) {
    api.getAllTags().then(tags => {
      dispatch({type: 'loadTags', tags});
    });
  };
}

export function search(tags) {
  return function (dispatch) {
    dispatch({type: 'search', tags});
    dispatch(loadSearchResults());
  };
}

function loadSearchResults() {
  return function (dispatch, getState) {
    const state = getState();
    const tagIds = _.cloneDeep(_.get(state, ['data', 'search', 'tags']));
    if(!tagIds)
      return;
    api.findItems({tagIds: tagIds}).then(items => {
      dispatch({
        type: 'loadSearchResults',
        search: {
          tags: tagIds,
          results: items,
        },
      });
    });
  };
}

function uploadImage(image, tagIds) {
  return function (dispatch) {
    api.uploadImage(image, tagIds)
    .then(id => console.log('upload complete', id))
    .catch(e => console.error(e));
  }
}
