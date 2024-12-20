import { createReducer, on } from '@ngrx/store';
import * as CommentActions from './comment.actions';
import { commentsAdapter, initialStateUserComments } from './comment.state';
import { PostWithLikedAndCount } from 'src/models/post.types';

export const commentReducer = createReducer(
  initialStateUserComments,
  on(CommentActions.getResponseForComments, (state, { comments }) => {
    return commentsAdapter.addMany(comments, state);
  }),
  on(CommentActions.getResponseToAddComment, (state, { comment }) => {
    return commentsAdapter.addOne(comment, state);
  }),
  on(CommentActions.getResponseToDeleteComment, (state, { commentId }) => {
    return commentsAdapter.removeOne(commentId, state);
  })
);
