import { UserGetDto } from 'src/models/user.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { connectionsAdapter } from './connections.state';
import { ConnectionsState } from './connections.types';

const { selectIds, selectEntities, selectAll, selectTotal } =
  connectionsAdapter.getSelectors();

export const selectConnectionsState =
  createFeatureSelector<ConnectionsState>('connections');

// select the array of connected user ids
export const selectConnectionsIds = createSelector(
  selectConnectionsState,
  selectIds
);

// select the dictionary of connected user entities
export const selectConnectionsEntities = createSelector(
  selectConnectionsState,
  selectEntities
);

// select the array of connected users
export const selectAllConnections = createSelector(
  selectConnectionsState,
  selectAll
);

// select the total connected user count
export const selectConnectionsTotal = createSelector(
  selectConnectionsState,
  selectTotal
);
