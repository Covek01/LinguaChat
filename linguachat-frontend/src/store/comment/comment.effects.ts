import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/services/user.service';
import * as CommentsActions from './comment.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { ConnectionService } from 'src/services/connection.service';
import { LanguageService } from 'src/services/language.service';
import { CommentService } from 'src/services/comment.service';

@Injectable()
export class CommentEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentService
  ) {}

  getCommentsOfPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.sendRequestToGetComments),
      exhaustMap((action) =>
        this.commentService.getCommentsOfPost(action.postId).pipe(
          tap((response) => console.log('Response:', response)),
          map((comments) => {
            return CommentsActions.getResponseForComments({
              comments,
            });
          }),
          catchError((error) => of(CommentsActions.getError({ error: error })))
        )
      )
    )
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.sendRequestToAddComment),
      exhaustMap((action) =>
        this.commentService.addComment(action.commentInsert).pipe(
          tap((response) => console.log('Response:', response)),
          map((comment) => {
            return CommentsActions.getResponseToAddComment({
              comment,
            });
          }),
          catchError((error) => of(CommentsActions.getError({ error: error })))
        )
      )
    )
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.sendRequestToDeleteComment),
      exhaustMap((action) =>
        this.commentService.deleteComment(action.commentId).pipe(
          tap((response) => console.log('Response:', response)),
          map(() => {
            return CommentsActions.getResponseToDeleteComment({
              commentId: action.commentId,
            });
          }),
          catchError((error) => of(CommentsActions.getError({ error: error })))
        )
      )
    )
  );
}
