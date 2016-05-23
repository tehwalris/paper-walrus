const defaultState = {};

export default function(state = {}, action) {
  switch (action.type) {
    case 'loadSearchResults':
      return {...state, search: action.search};
    default:
      return state;
  }
}
