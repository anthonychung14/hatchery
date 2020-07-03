import _ from 'lodash';
import { createSelector } from 'reselect';

export const getSearch = state => state.search;
export const getSearchTerm = createSelector(
  [getSearch],
  searchState => searchState.searchTerm
);

export const getIsSearchFetching = createSelector(
  [getSearch],
  searchState => searchState.isFetching
);

export const getSearchStateResults = createSelector(
  [getSearch],
  searchState => searchState.results
);

export const getSearchResultIds = createSelector(
  [getIsSearchFetching, getSearchStateResults],
  (isFetching, results) => (isFetching ? results.map(i => i.id) : [])
);
