import { createAction, emptyProps, props } from '@ngrx/store';
import {
  ConnectionGetDto,
  ConnectionWithoutId,
} from 'src/models/connection.types';
import { UserGetDto } from 'src/models/user.types';

//get users
export const sendRequestToGetConnectedUsers = createAction(
  '[Connections] Send Request To Get Connected Users',
  props<{ id: number }>()
);

export const getResponseForConnectedUsers = createAction(
  '[Connections] Get Response For Getting Connected Users',
  props<{ users: UserGetDto[] }>()
);

//add user connection
export const sendRequestToAddConnectedUser = createAction(
  '[Connections] Send Request To Add Connected User',
  props<{ firstId: number; secondId: number }>()
);

export const getResponseToAddConnectedUser = createAction(
  '[Connections] Get Response For Adding Connected User',
  props<{ user: UserGetDto }>()
);

//delete user connection
export const sendRequestToDeleteConnectedUser = createAction(
  '[Connections] Send Request To Delete Connected User',
  props<{ firstId: number; secondId: number }>()
);

export const getResponseToDeleteConnectedUser = createAction(
  '[Connections] Get Response For Deleting Connected User',
  props<{ id: number }>()
);

export const getError = createAction(
  '[Connections] Get Error',
  props<{ error: string }>()
);
