import { createAction, emptyProps, props } from '@ngrx/store';
import { CommentGetDto, CommentInsertDto, CommentInterface } from 'src/models/comment.types';
import { Message } from 'src/models/message.types';
import { PostInsertDto, PostInterface } from 'src/models/post.types';

//get comments of post
export const sendRequestToGetMessages = createAction(
  '[Chat] Send Request To Get Chats',
  props<{ connectedUsersIds: number[] }>()
);

export const getResponseForMessages = createAction(
  '[Chat] Get Response For Getting Chats',
  props<{ comments: CommentGetDto[] }>()
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

//load older messages
export const sendRequestToDeleteComment = createAction(
  '[Chat] Send Request Load Older Messages',
  props<{ userId: number, offset: number, limit: number }>()
);

export const getResponseToDeleteComment = createAction(
  '[Chat] Get Response For Loading Older Messages',
  props<{ messages: Message[] }>()
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
