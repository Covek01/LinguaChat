import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/services/user.service';
import * as PostActions from './user-post.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { PostService } from 'src/services/post.service';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private postService: PostService
  ) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.sendRequestToGetPosts),
      exhaustMap((action) =>
        this.postService.getPostsOfUserWithLikedStatus(action.userId).pipe(
          tap((response) => console.log('User Response:', response)),
          map((posts) => {
            return PostActions.getResponseForPosts({
              posts,
            });
          }),
          catchError((error) => of(PostActions.getError({ error: error })))
        )
      )
    )
  );

  getPostsByMe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.sendRequestToGetPostsByMe),
      exhaustMap((action) =>
        this.postService.getPostsOfUserWithLikedStatusByMe().pipe(
          tap((response) => console.log('User Response:', response)),
          map((posts) => {
            return PostActions.getResponseForPosts({
              posts,
            });
          }),
          catchError((error) => of(PostActions.getError({ error: error })))
        )
      )
    )
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.sendRequestToAddPost),
      exhaustMap((action) =>
        this.postService.addPost(action.postInsert).pipe(
          tap((response) => console.log('User Response:', response)),
          map((post) => {
            return PostActions.getResponseToAddPost({
              post,
            });
          }),
          catchError((error) => of(PostActions.getError({ error: error })))
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.sendRequestToDeletePost),
      exhaustMap((action) =>
        this.postService.deletePost(action.postId).pipe(
          tap((response) => console.log('User Response:', response)),
          map(() => {
            return PostActions.getResponseToDeletePost({
              postId: action.postId,
            });
          }),
          catchError((error) => of(PostActions.getError({ error: error })))
        )
      )
    )
  );
}
