import {createSelector} from 'reselect';

const rawSearchSelector = state => state.search;
const entriesSelector = state => state.data.entries;

export const searchSelector = createSelector(
  rawSearchSelector,
  entriesSelector,
  (rawSearch, entries) => ({
    query: rawSearch.query,
    results: _.compact(rawSearch.results.map(id => entries[id])),
  })
);
