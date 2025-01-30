import { UserGetDto } from 'src/models/user.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { filteredUsersAdapter } from './filtered-users.state';
import { FilteredUsersState } from './filtered-users.types';

const { selectIds, selectEntities, selectAll, selectTotal } =
  filteredUsersAdapter.getSelectors();

export const selectFilteredUsersState =
  createFeatureSelector<FilteredUsersState>('filteredUsers');

// select the array of connected user ids
export const selectFilteredUsersIds = createSelector(
  selectFilteredUsersState,
  selectIds
);

// select the dictionary of connected user entities
export const selectFilteredUsersEntities = createSelector(
  selectFilteredUsersState,
  selectEntities
);

// select the array of connected users
export const selectAllFilteredUsers = createSelector(
  selectFilteredUsersState,
  selectAll
);

// select the total connected user count
export const selectFilteredUsersTotal = createSelector(
  selectFilteredUsersState,
  selectTotal
);

export const selectPaginatorSize = createSelector(
  selectFilteredUsersState,
  (filteredUsers) => {
    return filteredUsers.paginatorSize;
  }
);

export const selectFilteredLanguageId = createSelector(
  selectFilteredUsersState,
  (filteredUsers) => {
    return filteredUsers.filteredLanguageId;
  }
);

export const selectFilteredUsersCount = createSelector(
  selectFilteredUsersState,
  (filteredUsers) => {
    return filteredUsers.userCount;
  }
);
