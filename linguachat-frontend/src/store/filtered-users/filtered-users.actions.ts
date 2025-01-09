import { createAction, emptyProps, props } from '@ngrx/store';
import { UserGetDto } from 'src/models/user.types';

//get users
export const sendRequestToGetFilteredUsers = createAction(
  '[Filtered Users] Send Request To Get Filtered Users',
  props<{ userId: number, languageId: number }>()
);

export const sendRequestToGetFilteredUsersByMe = createAction(
  '[Filtered Users] Send Request To Get Filtered Users By Me',
  props<{ languageId: number }>()
);

export const getResponseForCFilteredUsers = createAction(
  '[Filtered Users] Get Response For Getting Filtered Users',
  props<{ users: UserGetDto[] }>()
);

export const getError = createAction(
  '[Filtered Users] Get Error',
  props<{ error: string }>()
);
