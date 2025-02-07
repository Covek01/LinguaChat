import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectAllPosts } from 'src/store/user/post/user-post.selector';
import { MyprofileTabPostAddDialogComponent } from '../myprofile-tab-post-add-dialog/myprofile-tab-post-add-dialog.component';
import { sendRequestToAddPost } from 'src/store/user/post/user-post.actions';
import { Observable, Subscription } from 'rxjs';
import { PostWithLikedAndCount } from 'src/models/post.types';

@Component({
  selector: 'app-myprofile-tab-posts',
  templateUrl: './myprofile-tab-posts.component.html',
  styleUrls: ['./myprofile-tab-posts.component.sass'],
})
export class MyprofileTabPostsComponent implements OnDestroy {
  constructor(private readonly store: Store, private dialog: MatDialog) {}
 
  ngOnDestroy(): void {
    this.closeDialogSubscription$?.unsubscribe();
  }

  userPosts$: Observable<PostWithLikedAndCount[]> = this.store.select(selectAllPosts);
  closeDialogSubscription$: Subscription | null = null;



  handleAddPostDialog() {
    const dialogRef = this.dialog.open(MyprofileTabPostAddDialogComponent, {
      width: '600px',
    });

    this.closeDialogSubscription$ = dialogRef.afterClosed().subscribe((postToInsert) => {
      console.log(postToInsert);
      if (postToInsert) {
        this.store.dispatch(sendRequestToAddPost({ postInsert: postToInsert }));
      }
    });
  }
}
