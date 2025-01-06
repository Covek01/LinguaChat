import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs';
import { PostWithLikedAndCount } from 'src/models/post.types';
import { UserGetDto } from 'src/models/user.types';
import {
  sendRequestToAddComment,
  sendRequestToGetComments,
} from 'src/store/comment/comment.actions';
import {
  sendRequestToDeletePost,
  sendRequestToLikePost,
  sendRequestToUnlikePost,
} from 'src/store/user/post/user-post.actions';
import {
  selectMyUser,
  selectUser,
} from 'src/store/user/user-data/user-data.selector';
import { MyprofileTabCommentAddDialogComponent } from '../myprofile-tab-comment-add-dialog/myprofile-tab-comment-add-dialog.component';
import { CommentInsertDto } from 'src/models/comment.types';

@Component({
  selector: 'app-myprofile-tab-post-item',
  templateUrl: './myprofile-tab-post-item.component.html',
  styleUrls: ['./myprofile-tab-post-item.component.sass'],
})
export class MyprofileTabPostItemComponent implements OnInit, OnDestroy {
  @Input() post: PostWithLikedAndCount | null = null;
  myUser: UserGetDto | null = null;

  constructor(private readonly store: Store, private dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  userInfo$ = this.store.select(selectMyUser);
  userSubscription = this.store.select(selectMyUser).subscribe((user) => {
    this.myUser = user;
  });

  ngOnInit(): void {
    this.store.dispatch(
      sendRequestToGetComments({ postId: this.post?.id ?? 0 })
    );
  }

  likeOrUnlikePost(): void {
    if (!this.post) {
      return;
    }
    if (this.post?.liked === true) {
      this.unlikePost();
    } else {
      this.likePost();
    }
  }

  likePost(): void {
    this.store.dispatch(
      sendRequestToLikePost({
        userId: this.myUser?.id ?? 0,
        postId: this.post?.id ?? 0,
      })
    );
  }

  unlikePost(): void {
    this.store.dispatch(
      sendRequestToUnlikePost({
        userId: this.myUser?.id ?? 0,
        postId: this.post?.id ?? 0,
      })
    );
  }

  deletePost(): void {
    this.store.dispatch(
      sendRequestToDeletePost({ postId: this.post?.id ?? 0 })
    );
  }

  handleAddCommentDialog(): void {
    const dialogRef = this.dialog.open(MyprofileTabCommentAddDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((commentText) => {
      console.log(commentText);
      if (commentText) {
        const commentInsertDto = {
          ...commentText,
          postRelatedToId: this.post?.id ?? 0,
          userCommentedId: this.myUser?.id ?? 0,
        };

        console.log(commentInsertDto instanceof CommentInsertDto);
        if (commentInsertDto) {
          this.store.dispatch(
            sendRequestToAddComment({ commentInsert: commentInsertDto })
          );
        }
      }
    });
  }
}
