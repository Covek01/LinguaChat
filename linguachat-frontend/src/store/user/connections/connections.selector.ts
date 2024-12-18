import { UserGetDto } from 'src/models/user.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { connectionsAdapter } from './connections.state';
import { ConnectionsState } from './connections.types';

const { selectIds, selectEntities, selectAll, selectTotal } =
  connectionsAdapter.getSelectors();

export const selectConnectionsState =
  createFeatureSelector<ConnectionsState>('blockedUsers');

// select the array of connected user ids
export const selectBlockedUserIds = createSelector(
  selectConnectionsState,
  selectIds
);

// select the dictionary of connected user entities
export const selectBlockedUserEntities = createSelector(
  selectConnectionsState,
  selectEntities
);

// select the array of connected users
export const selectAllBlockedUsers = createSelector(
  selectConnectionsState,
  selectAll
);

// select the total connected user count
export const selectBlockedUsersTotal = createSelector(
  selectConnectionsState,
  selectTotal
);
