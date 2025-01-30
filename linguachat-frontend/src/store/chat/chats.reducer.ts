import { createReducer, on } from '@ngrx/store';
import * as CommentActions from './chats.actions';
import { PostWithLikedAndCount } from 'src/models/post.types';

// export const chatsReducer = createReducer(
//   initialStateUserComments,
//   on(CommentActions.getResponseForComments, (state, { comments }) => {
//     return commentsAdapter.addMany(comments, state);
//   }),
//   on(CommentActions.getResponseToAddComment, (state, { comment }) => {
//     return commentsAdapter.addOne(comment, state);
//   }),
//   on(CommentActions.getResponseToDeleteComment, (state, { commentId }) => {
//     return commentsAdapter.removeOne(commentId, state);
//   })
// );
