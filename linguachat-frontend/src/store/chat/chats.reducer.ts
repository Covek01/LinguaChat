import { createReducer, on } from '@ngrx/store';
import * as ChatsActions from './chats.actions';
import { chatsAdapter, initialStateChats } from './chats.state';
import { Chat } from './chats.types';

export const chatsReducer = createReducer(
  initialStateChats,
  on(ChatsActions.addMessage, (state, { userId, message }) => {
    const chat = state.entities[userId];
    if (chat === undefined) {
      return {
        ...state,
      };
    }

    const newChat: Chat = {
      ...chat,
      messages: [...chat.messages, message],
    };
    
    return chatsAdapter.updateOne(
      {
        id: userId,
        changes: newChat,
      },
      state
    );
  })
);
