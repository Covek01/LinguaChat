import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import * as ChatsActions from './chats.actions';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { CommentService } from 'src/services/comment.service';
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
            tap((response) => console.log('Comment Response:', response)),
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
}
