const defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'loadSearchResults':
      return loadSearchResults(state, action);
    case 'setQuery':
      return {...state, query: action.query, results: null, oldResults: state.results};
    case 'reset':
      return defaultState;
    default:
      return state;
  }
}

function loadSearchResults(state, action) {
  return {...state, query: action.query, results: action.results};
}
