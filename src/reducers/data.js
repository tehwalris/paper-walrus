const defaultState = {
  tags: {},
  entries: {},
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'loadTags':
      return {...state, tags: _.keyBy(action.tags, 'id')};
    case 'loadEntries':
      return {...state, entries: {...state.entries, ..._.keyBy(action.entries, 'id')}};
    default:
      return state;
  }
}
