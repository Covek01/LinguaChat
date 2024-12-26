import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectAllPosts } from 'src/store/user/post/user-post.selector';

@Component({
  selector: 'app-myprofile-tab-posts',
  templateUrl: './myprofile-tab-posts.component.html',
  styleUrls: ['./myprofile-tab-posts.component.sass'],
})
export class MyprofileTabPostsComponent {
  constructor(private readonly store: Store, private dialog: MatDialog) {}
  userPosts$ = this.store.select(selectAllPosts)
}
