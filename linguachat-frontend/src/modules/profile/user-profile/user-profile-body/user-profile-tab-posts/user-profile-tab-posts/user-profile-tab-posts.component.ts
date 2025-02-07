import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostWithLikedAndCount } from 'src/models/post.types';
import { selectAllPosts } from 'src/store/user/post/user-post.selector';

@Component({
  selector: 'app-user-profile-tab-posts',
  templateUrl: './user-profile-tab-posts.component.html',
  styleUrls: ['./user-profile-tab-posts.component.sass'],
})
export class UserProfileTabPostsComponent {
  constructor(private readonly store: Store) {}

  public userPosts$: Observable<PostWithLikedAndCount[]> =
    this.store.select(selectAllPosts);
}
