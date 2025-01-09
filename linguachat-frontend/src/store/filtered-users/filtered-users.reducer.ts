import { createReducer, on } from '@ngrx/store';

import * as FilteredUsersActions from './filtered-users.actions';
import { filteredUsersAdapter, initialStateFilteredUsers } from './filtered-users.state';

export const filteredUsersReducer = createReducer(
  initialStateFilteredUsers,
  on(FilteredUsersActions.getResponseForCFilteredUsers, (state, { users }) => {
    return filteredUsersAdapter.setAll(users, state);
  }),

);
