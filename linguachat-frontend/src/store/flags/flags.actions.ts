import { createAction, emptyProps, props } from '@ngrx/store';
import { Flag } from 'src/models/models.type';

//get languages learning by user
export const sendRequestToGetFlags = createAction(
  '[Flags] Send Request To Get Flags',
  emptyProps
);

export const getResponseForFlags = createAction(
  '[Flags] Get Response For Getting Flags',
  props<{ flags: Flag[] }>()
);

export const getError = createAction(
  '[Flags] Get Error',
  props<{ error: string }>()
);
