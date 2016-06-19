const defaultState = {
  tags: [],
};

export default function(state = {}, action) {
  switch (action.type) {
    case 'loadSearchResults':
      return loadSearchResults(state, action);
    case 'loadTags':
      return {...state, tags: _.keyBy(action.tags, 'id')};
    case 'search':
      return {...state, search: {tags: action.tags}};
    default:
      return state;
  }
}

function loadSearchResults(state, action) {
  if(action.search.tags !== _.get(state.search.tags))
    return {...state, search: action.search};
  return {
    ...state,
    search: {
      ...search,
      results: action.search.results,
    },
  };
}
