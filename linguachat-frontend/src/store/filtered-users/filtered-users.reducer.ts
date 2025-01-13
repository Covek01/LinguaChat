import { createReducer, on } from '@ngrx/store';

import * as FilteredUsersActions from './filtered-users.actions';
import {
  filteredUsersAdapter,
  initialStateFilteredUsers,
} from './filtered-users.state';

export const filteredUsersReducer = createReducer(
  initialStateFilteredUsers,
  on(FilteredUsersActions.getResponseForFilteredUsers, (state, { users }) => {
    return filteredUsersAdapter.setAll(users, state);
  }),
  on(FilteredUsersActions.setPaginatorSize, (state, { size }) => {
    return {
      ...state,
      paginatorSize: size,
    };
  }),
  on(FilteredUsersActions.setFilteredLanguageId, (state, { languageId }) => {
    return {
      ...state,
      filteredLanguageId: languageId,
    };
  }),
);
