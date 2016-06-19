const defaultState = {
  results: [],
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'loadSearchResults':
      return loadSearchResults(state, action);
    case 'setQuery':
      return {...state, query: action.query, results: []};
    default:
      return state;
  }
}

function loadSearchResults(state, action) {
  if(action.query.tags !== _.get(state, ['query', 'tags']))
    return {...state, results: action.results};
  return {...state, query: action.query, results: [...state.results, ...action.results]};
}
