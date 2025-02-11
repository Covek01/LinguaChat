import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ChatsActions from './chats.actions';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  of,
  tap,
} from 'rxjs';
import { ChatService } from 'src/services/chat.service';
import { Message } from 'src/models/message.types';

@Injectable()
export class ChatsEffects {
  constructor(private actions$: Actions, private chatService: ChatService) {}

  getChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatsActions.sendRequestToGetChat),
      concatMap((action) =>
        this.chatService
          .loadMessages(action.chatKey, action.limit, action.offset)
          .pipe(
            tap((response) => console.log('Messages Response:', response)),
            map((messages: Message[]) => {
              return ChatsActions.getResponseForChat({
                connectedUserId: action.connectedUserId,
                messages,
                chatKey: action.chatKey
              });
            }),
            catchError((error) => of(ChatsActions.getError({ error: error })))
          )
      )
    )
  );

  loadOlderMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatsActions.sendRequestToLoadOlderMessages),
      exhaustMap((action) =>
        this.chatService
          .loadMessages(action.chatKey, action.limit, action.offset)
          .pipe(
            tap((response) => console.log('Messages Response:', response)),
            map((messages: Message[]) => {
              return ChatsActions.getResponseForLoadingOlderMessages({
                connectedUserId: action.connectedUserId,
                messages,
                chatKey: action.chatKey
              });
            }),
            catchError((error) => of(ChatsActions.getError({ error: error })))
          )
      )
    )
  );
}
