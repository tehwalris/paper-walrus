const defaultState = {
  tags: [],
};

export default function(state = {}, action) {
  switch (action.type) {
    case 'loadSearchResults':
      return {...state, search: action.search};
    case 'loadTags':
      return {...state, tags: action.tags};
    default:
      return state;
  }
}
