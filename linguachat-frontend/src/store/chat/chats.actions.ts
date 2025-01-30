import { createAction, emptyProps, props } from '@ngrx/store';
import { CommentGetDto, CommentInsertDto, CommentInterface } from 'src/models/comment.types';
import { PostInsertDto, PostInterface } from 'src/models/post.types';

//get comments of post
export const sendRequestToGetComments = createAction(
  '[Chat] Send Request To Get Chats',
  props<{ postId: number }>()
);

export const getResponseForComments = createAction(
  '[Chat] Get Response For Getting Chats',
  props<{ comments: CommentGetDto[] }>()
);

//add comment
export const sendRequestToAddComment = createAction(
  '[Chat] Send Request To Add Message',
  props<{ commentInsert: CommentInsertDto }>()
);

export const getResponseToAddComment = createAction(
  '[Chat] Get Response For Adding Comment Of Post',
  props<{ comment: CommentGetDto }>()
);

//delete comment
export const sendRequestToDeleteComment = createAction(
  '[Chat] Send Request To Delete Comment',
  props<{ commentId: number }>()
);

export const getResponseToDeleteComment = createAction(
  '[Chat] Get Response For Deleting Comment',
  props<{ commentId: number }>()
);

//delete comments of post
export const sendRequestToDeleteCommentsOfPost = createAction(
  '[Chat] Send Request To Delete Comments Of Post',
  props<{ postId: number }>()
);

export const getResponseToDeleteCommentsOfPost = createAction(
  '[Chat] Get Response For Deleting Comments Of Post',
  props<{ commentId: number }>()
);

export const getError = createAction(
  '[Chat] Get Error',
  props<{ error: string }>()
);
