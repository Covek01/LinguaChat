import { UserGetDto } from 'src/models/user.types';
import { blockedUsersAdapter } from './blocked-users.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlockedUsersState } from './blocked-users.types';

const { selectIds, selectEntities, selectAll, selectTotal } =
  blockedUsersAdapter.getSelectors();

export const selectBlockedUsersState =
  createFeatureSelector<BlockedUsersState>('blockedUsers');

// select the array of blocked user ids
export const selectBlockedUserIds = createSelector(
  selectBlockedUsersState,
  selectIds
);

// select the dictionary of blocked user entities
export const selectBlockedUserEntities = createSelector(
  selectBlockedUsersState,
  selectEntities
);

// select the array of blocked users
export const selectAllBlockedUsers = createSelector(
  selectBlockedUsersState,
  selectAll
);

// select the total blocked user count
export const selectBlockedUsersTotal = createSelector(
  selectBlockedUsersState,
  selectTotal
);
