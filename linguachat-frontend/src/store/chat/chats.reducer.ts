import { createReducer, on } from '@ngrx/store';
import * as ChatsActions from './chats.actions';
import { chatsAdapter, initialStateChats } from './chats.state';
import { Chat } from './chats.types';
import { Message } from 'src/models/message.types';
import { Update } from '@ngrx/entity';

export const chatsReducer = createReducer(
  initialStateChats,
  on(ChatsActions.addMessage, (state, { userId, message }) => {
    const chat: Chat | undefined = state.entities[userId];
    if (chat === undefined) {
      return {
        ...state,
      };
    }

    const newChat: Chat = {
      ...chat,
      messages: [...chat.messages, message],
    };

    const chatUpdate: Update<Chat> = {
      id: userId,
      changes: newChat,
    };

    return chatsAdapter.updateOne(chatUpdate, state);
  }),
  on(
    ChatsActions.getResponseForChat,
    (state, { connectedUserId, messages, chatKey }) => {
      const chatUpdated: Chat = {
        connectedUserId: connectedUserId,
        messages: messages,
        chatKey: chatKey
      }

      return chatsAdapter.upsertOne(chatUpdated, state);
    }
  ),
  on(
    ChatsActions.getResponseForLoadingOlderMessages,
    (state, { connectedUserId, messages, chatKey }) => {
      const chat: Chat | undefined = state.entities[connectedUserId];
      if (chat === undefined) {
        return {
          ...state,
        };
      }

      const updatedChat: Chat = {
        ...chat,
        messages: [...messages, ...chat.messages],
        chatKey
      }
      console.log('SELECTOR')
      console.log(messages)
      console.log(chat.messages)
      console.log(updatedChat.messages)



      const chatUpdate: Update<Chat> = {
        id: connectedUserId,
        changes: updatedChat,
      }

      return chatsAdapter.updateOne(chatUpdate, state);
    }
  ),
);
