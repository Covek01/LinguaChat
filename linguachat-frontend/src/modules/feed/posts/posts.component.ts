import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllPosts } from 'src/store/user/post/user-post.selector';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass'],
})
export class PostsComponent {
  constructor(private readonly store: Store) {}
  
  userPosts$ = this.store.select(selectAllPosts);
}
