import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectAllPosts } from 'src/store/user/post/user-post.selector';
import { MyprofileTabPostAddDialogComponent } from '../myprofile-tab-post-add-dialog/myprofile-tab-post-add-dialog.component';
import { sendRequestToAddPost } from 'src/store/user/post/user-post.actions';
import { PostInsertDto } from 'src/models/post.types';

@Component({
  selector: 'app-myprofile-tab-posts',
  templateUrl: './myprofile-tab-posts.component.html',
  styleUrls: ['./myprofile-tab-posts.component.sass'],
})
export class MyprofileTabPostsComponent {
  constructor(private readonly store: Store, private dialog: MatDialog) {}
  userPosts$ = this.store.select(selectAllPosts);

  handleAddPostDialog() {
    const dialogRef = this.dialog.open(MyprofileTabPostAddDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((postToInsert) => {
      console.log(postToInsert);
      if (postToInsert) {
        this.store.dispatch(sendRequestToAddPost({ postInsert: postToInsert }));
      }
    });
  }
}
