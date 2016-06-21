import {createSelector} from 'reselect';

const rawSearchSelector = state => state.search;
const entriesSelector = state => state.data.entries;

const emptySearchResults = [];
const displayedSearchResultsSelector = createSelector(
  rawSearchSelector,
  (rawSearch) => rawSearch.results || rawSearch.oldResults || emptySearchResults,
);

const searchQuerySelector = createSelector(
  rawSearchSelector,
  (rawSearch) => rawSearch.query,
);

const searchLoadingSelector = createSelector(
  rawSearchSelector,
  (rawSearch) => !!rawSearch.query && !rawSearch.results,
);

export const searchSelector = createSelector(
  searchQuerySelector,
  displayedSearchResultsSelector,
  entriesSelector,
  searchLoadingSelector,
  (query, dispalyedResults, entries, loading) => ({
    results: _.compact(dispalyedResults.map(id => entries[id])),
    query,
    loading,
  })
);
