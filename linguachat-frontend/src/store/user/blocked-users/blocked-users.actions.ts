import { createAction, emptyProps, props } from '@ngrx/store';
import {
  UserGetDto,
} from 'src/models/user.types';

export const sendRequestToGetBlockedUsers = createAction(
  '[User Blocks] Send Request To Get Users',
  props<{ id: number }>()
);

export const getResponseForBlockedUsers = createAction(
  '[User Blocks] Get Response For Blocked Users',
  props<{ users: UserGetDto[] }>()
);

export const getError = createAction(
  '[User BLocks] Get Error',
  props<{ error: string }>()
);
