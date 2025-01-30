import { createReducer, on } from '@ngrx/store';
import {
  connectionsAdapter,
  initialStateConnections,
} from './connections.state';
import * as ConnectionsActions from './connections.actions';

export const connectionsReducer = createReducer(
  initialStateConnections,
  on(ConnectionsActions.getResponseForConnectedUsers, (state, { users }) => {
    return connectionsAdapter.setAll(users, state);
  }),
  on(ConnectionsActions.getResponseToAddConnectedUser, (state, { user }) => {
    return connectionsAdapter.addOne(user, state);
  }),
  on(ConnectionsActions.getResponseToDeleteConnectedUser, (state, { id }) => {
    return connectionsAdapter.removeOne(id, state);
  })
);
