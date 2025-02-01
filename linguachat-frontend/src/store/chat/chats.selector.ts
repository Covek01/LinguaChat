import { UserGetDto } from 'src/models/user.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { chatsAdapter } from './chats.state';
import { ChatsState } from './chats.types';

const { selectIds, selectEntities, selectAll, selectTotal } =
  chatsAdapter.getSelectors();

export const chatsState = createFeatureSelector<ChatsState>('chats');

// select the array of comments ids
export const selectChatIds = createSelector(chatsState, selectIds);

// select the dictionary of comment entities
export const selectChatEntities = createSelector(
  chatsState,
  selectEntities
);

// select the array of comments
export const selectAllChats = createSelector(chatsState, selectAll);

// select the total comments count
export const selectChatsTotal = createSelector(chatsState, selectTotal);
