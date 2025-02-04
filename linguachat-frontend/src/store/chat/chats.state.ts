import { createEntityAdapter } from '@ngrx/entity';
import { Chat, ChatsState } from './chats.types';


export function selectConnectedUserId(chat: Chat) {
  return chat.connectedUserId;
}

export function selectChatKey(chat: Chat) {
  return chat.chatKey;
}

export const chatsAdapter = createEntityAdapter<Chat>({
  selectId: selectConnectedUserId
});

export const initialStateChats: ChatsState =
  chatsAdapter.getInitialState();
