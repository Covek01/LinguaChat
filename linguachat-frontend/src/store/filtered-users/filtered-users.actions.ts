import { createAction, emptyProps, props } from '@ngrx/store';
import { UserGetDto } from 'src/models/user.types';

//get users
export const sendRequestToGetFilteredUsers = createAction(
  '[Filtered Users] Send Request To Get Filtered Users',
  props<{ userId: number; languageId: number }>()
);

export const sendRequestToGetFilteredUsersByMe = createAction(
  '[Filtered Users] Send Request To Get Filtered Users By Me',
  props<{ languageId: number }>()
);

export const sendRequestToGetFilteredUsersPaginationByMe = createAction(
  '[Filtered Users] Send Request To Get Filtered Users With Offset By Me',
  props<{ languageId: number; limit: number; offset: number }>()
);

export const getResponseForFilteredUsers = createAction(
  '[Filtered Users] Get Response For Getting Filtered Users',
  props<{ users: UserGetDto[] }>()
);

export const setPaginatorSize = createAction(
  '[Filtered Users] Set Paginator Size',
  props<{ size: number }>()
);

export const setFilteredLanguageId = createAction(
  '[Filtered Users] Set Filtered Language Id',
  props<{ languageId: number }>()
);

export const getError = createAction(
  '[Filtered Users] Get Error',
  props<{ error: string }>()
);
