import { createAction, emptyProps, props } from '@ngrx/store';
import { UserGetDto } from 'src/models/user.types';

//get blocked users
export const sendRequestToGetBlockedUsers = createAction(
  '[User Blocks] Send Request To Get Users',
  emptyProps
);

export const getResponseForBlockedUsers = createAction(
  '[User Blocks] Get Response For Blocked Users',
  props<{ users: UserGetDto[] }>()
);

//add blocked user
export const sendRequestToAddBlockedUser = createAction(
  '[User Blocks] Send Request To Add Blocked User',
  props<{ myId: number; blockedId: number }>
);

export const getResponseForAddingBlockedUser = createAction(
  '[User Blocks] Get Response For Adding Blocked Users',
  props<{ user: UserGetDto }>()
);

//remove blocked user
export const sendRequestToRemoveBlockedUser = createAction(
  '[User Blocks] Send Request To Remove Blocked User',
  props<{ myId: number; blockedId: number }>
);

export const getResponseForRemovingBlockedUser = createAction(
  '[User Blocks] Get Response For Removing Blocked Users',
  emptyProps
);

export const getError = createAction(
  '[User BLocks] Get Error',
  props<{ error: string }>()
);
