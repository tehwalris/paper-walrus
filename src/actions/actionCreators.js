import Api from '../Api';

const api = new Api('localhost:3000', {
  transports: ['websocket']
});

export function loadTestData() {
  return function (dispatch) {
    api.findItems({tagIds: ['id2']}).then(items => {
      dispatch({
        type: 'loadSearchResults',
        search: {
          results: items,
        },
      });
    });
  }
}
