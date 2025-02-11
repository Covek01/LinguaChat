import { createAction, props } from '@ngrx/store';
import { CommentGetDto, } from 'src/models/comment.types';
import { Message } from 'src/models/message.types';

//get comments of post
export const sendRequestToGetChat = createAction(
  '[Chat] Send Request To Get Chat',
  props<{ connectedUserId: number, chatKey: string, limit: number, offset: number }>()
);

export const getResponseForChat = createAction(
  '[Chat] Get Response For Getting Chat',
  props<{ connectedUserId: number, chatKey: string, messages: Message[] }>()
);

//add message
export const addMessage = createAction(
  '[Chat] Add Message',
  props<{ userId: number, message: Message }>()
);

export const getResponseToAddComment = createAction(
  '[Chat] Get Response For Adding Messages',
  props<{ comment: CommentGetDto }>()
);

export const setMessagesToChat = createAction(
  '[Chat] Set Messages To Chat',
  props<{ connectedUserId: number, chatKey: string, messages: Message[] }>()
);

//load older messages
export const sendRequestToLoadOlderMessages = createAction(
  '[Chat] Send Request Load Older Messages',
  props<{ connectedUserId: number, chatKey: string, limit: number, offset: number }>()
);

export const getResponseForLoadingOlderMessages = createAction(
  '[Chat] Get Response For Loading Older Messages',
  props<{ connectedUserId: number, chatKey: string, messages: Message[] }>()
);

//delete comments of post
export const sendRequestToDeleteCommentsOfPost = createAction(
  '[Chat] Send Request To Delete Message',
  props<{ postId: number }>()
);

export const getResponseToDeleteCommentsOfPost = createAction(
  '[Chat] Get Response For Deleting Message',
  props<{ commentId: number }>()
);

export const getError = createAction(
  '[Chat] Get Error',
  props<{ error: string }>()
);
