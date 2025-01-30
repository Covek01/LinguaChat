import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllPosts } from 'src/store/user/post/user-post.selector';

@Component({
  selector: 'app-user-profile-tab-posts',
  templateUrl: './user-profile-tab-posts.component.html',
  styleUrls: ['./user-profile-tab-posts.component.sass']
})
export class UserProfileTabPostsComponent {
  constructor(private readonly store: Store) {}
  
  userPosts$ = this.store.select(selectAllPosts);

}
