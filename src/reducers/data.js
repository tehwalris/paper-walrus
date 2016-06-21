const defaultState = {
  tags: {},
  entries: {},
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'loadTags':
      return {...state, tags: _.keyBy(action.tags, 'id')};
    case 'loadExtraTag':
      return {...state, tags: {...state.tags, [action.tag.id]: action.tag}};
    case 'loadEntries':
      return {...state, entries: {...state.entries, ..._.keyBy(action.entries, 'id')}};
    case 'unloadEntries':
      return {...state, entries: _.omit(state.entries, action.entryIds)};
    default:
      return state;
  }
}
