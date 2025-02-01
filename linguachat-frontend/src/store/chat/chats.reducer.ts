import { createReducer, on } from '@ngrx/store';
import * as ChatsActions from './chats.actions';
import { chatsAdapter, initialStateChats } from './chats.state';
import { Chat } from './chats.types';
import { Message } from 'src/models/message.types';

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
  }),
  on(ChatsActions.sendRequestToGetMessages, (state, { connectedUsersIds }) => {
    const chats = connectedUsersIds.map((id): Chat => {
      return {
        connectedUserId: id,
        messages: [],
      };
    });

    return chatsAdapter.setAll(chats, state);
  })
);
