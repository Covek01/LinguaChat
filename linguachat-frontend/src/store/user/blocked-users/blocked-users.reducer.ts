import { createReducer, on } from "@ngrx/store";
import { blockedUsersAdapter, initialStateBlockedUsers } from "./blocked-users.state";
import * as BlockedUsersDataActions from './blocked-users.actions';


export const blockedUsersStateReducer = createReducer(
  initialStateBlockedUsers,
  on(BlockedUsersDataActions.getResponseForBlockedUsers, (state, { users }) => {
    return blockedUsersAdapter.setAll(users, state);
  }),
  on(BlockedUsersDataActions.getError, (state, { error }) => ({
    ...state,
    error: error,
  }))
);