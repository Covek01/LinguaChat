import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostWithLikedAndCount } from 'src/models/post.types';
import { sendRequestToAddPaginatedPostsByMe } from 'src/store/user/post/user-post.actions';
import {
  selectAllPosts,
  selectPostsTotal,
} from 'src/store/user/post/user-post.selector';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass'],
})
export class PostsComponent {
  private _paginationLimit: number = 10;
  private _offset: number = 0;
  public maxPostOnFeedNumber: number = 100;

  constructor(private readonly _store: Store) {}

  public userPosts$: Observable<PostWithLikedAndCount[]> =
    this._store.select(selectAllPosts);

  public userPostsCount$: Observable<number> =
    this._store.select(selectPostsTotal);

  public loadOlderPosts(): void {
    this._offset += this._paginationLimit;
    this._store.dispatch(
      sendRequestToAddPaginatedPostsByMe({
        limit: this._paginationLimit,
        offset: this._offset,
      })
    );
  }
}
