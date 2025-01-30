import { createReducer, on } from '@ngrx/store';
import { initialStateUser } from './user-data.state';
import * as UserDataActions from './user-data.actions';

export const userStateReducer = createReducer(
  initialStateUser,
  on(UserDataActions.getResponse, (state, { user }) => ({
    ...state,
    user: user,
  })),
  on(UserDataActions.getError, (state, { error }) => ({
    ...state,
    error: error,
  }))
);

export const myUserStateReducer = createReducer(
  initialStateUser,
  on(UserDataActions.getResponseForMyUser, (state, { user }) => ({
    ...state,
    user: user,
  })),
  on(UserDataActions.getError, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
