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
  private paginationLimit: number = 10;
  private offset: number = 0;
  public maxPostOnFeedNumber: number = 100;

  constructor(private readonly store: Store) {}

  public userPosts$: Observable<PostWithLikedAndCount[]> =
    this.store.select(selectAllPosts);

  public userPostsCount$: Observable<number> =
    this.store.select(selectPostsTotal);

  public loadOlderPosts(): void {
    this.offset += this.paginationLimit;
    this.store.dispatch(
      sendRequestToAddPaginatedPostsByMe({
        limit: this.paginationLimit,
        offset: this.offset,
      })
    );
  }
}
