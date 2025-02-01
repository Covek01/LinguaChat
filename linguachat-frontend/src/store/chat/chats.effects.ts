import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/services/user.service';
import * as ChatsActions from './chats.actions';
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { ConnectionService } from 'src/services/connection.service';
import { LanguageService } from 'src/services/language.service';
import { CommentService } from 'src/services/comment.service';

@Injectable()
export class ChatsEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentService
  ) {}

  // getCommentsOfPost$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ChatsActions.addMessage),
  //     concatMap((action) =>
  //       this.commentService.getCommentsOfPost(action.postId).pipe(
  //         tap((response) => console.log('Comment Response:', response)),
  //         map((comments) => {
  //           return ChatsActions.getResponseForComments({
  //             comments,
  //           });
  //         }),
  //         catchError((error) => of(ChatsActions.getError({ error: error })))
  //       )
  //     )
  //   )
  // );

 
}
