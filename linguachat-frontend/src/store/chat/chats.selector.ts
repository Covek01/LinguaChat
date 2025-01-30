import { UserGetDto } from 'src/models/user.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { chatsAdapter } from './chats.state';
import { ChatsState } from './chats.types';

const { selectIds, selectEntities, selectAll, selectTotal } =
  chatsAdapter.getSelectors();

export const commentState = createFeatureSelector<ChatsState>('chats');

// select the array of comments ids
export const selectCommentIds = createSelector(commentState, selectIds);

// select the dictionary of comment entities
export const selectCommentEntities = createSelector(
  commentState,
  selectEntities
);

// select the array of comments
export const selectAllComments = createSelector(commentState, selectAll);

// select the total comments count
export const selectCommentsTotal = createSelector(commentState, selectTotal);
