import { createEntityAdapter } from '@ngrx/entity';
import { Chat, ChatsState } from './chats.types';
import { select } from '@ngrx/store';


export function selectConnectedUserId(chat: Chat) {
  return chat.connectedUserId;
}

export const chatsAdapter = createEntityAdapter<Chat>({
  selectId: selectConnectedUserId
});

export const initialStateChats: ChatsState =
  chatsAdapter.getInitialState();
