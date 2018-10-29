import { sortBy } from 'lodash';

export const DEFAULT_QUERY = "blockchain";
export const DEFAULT_PAGE = 0;
export const PATH_BASE = 'https://hn.algolia.com/api/v1';
export const PATH_SEARCH = '/search';
export const PARAM_SEARCH = 'query=';
export const PARAM_PAGE = 'page=';

export const SORTBY = {
    NONE: hits => hits,
    TITLE: hits => sortBy(hits, 'title'),
    AUTHOR: hits => sortBy(hits, 'author'),
    COMMENTS: hits => sortBy(hits, 'num_comments').reverse(),
    POINTS: hits => sortBy(hits, 'points').reverse(),    
}