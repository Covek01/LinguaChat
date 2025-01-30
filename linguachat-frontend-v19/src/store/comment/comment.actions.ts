import { createAction, emptyProps, props } from '@ngrx/store';
import { CommentGetDto, CommentInsertDto, CommentInterface } from 'src/models/comment.types';
import { PostInsertDto, PostInterface } from 'src/models/post.types';

//get comments of post
export const sendRequestToGetComments = createAction(
  '[Comment] Send Request To Get Comments Of Post',
  props<{ postId: number }>()
);

export const getResponseForComments = createAction(
  '[Comment] Get Response For Getting Comments Of Post',
  props<{ comments: CommentGetDto[] }>()
);

//add comment
export const sendRequestToAddComment = createAction(
  '[Comment] Send Request To Add Comment Of Post',
  props<{ commentInsert: CommentInsertDto }>()
);

export const getResponseToAddComment = createAction(
  '[Comment] Get Response For Adding Comment Of Post',
  props<{ comment: CommentGetDto }>()
);

//delete comment
export const sendRequestToDeleteComment = createAction(
  '[Comment] Send Request To Delete Comment',
  props<{ commentId: number }>()
);

export const getResponseToDeleteComment = createAction(
  '[Comment] Get Response For Deleting Comment',
  props<{ commentId: number }>()
);

//delete comments of post
export const sendRequestToDeleteCommentsOfPost = createAction(
  '[Comment] Send Request To Delete Comments Of Post',
  props<{ postId: number }>()
);

export const getResponseToDeleteCommentsOfPost = createAction(
  '[Comment] Get Response For Deleting Comments Of Post',
  props<{ commentId: number }>()
);

export const getError = createAction(
  '[Comment] Get Error',
  props<{ error: string }>()
);
