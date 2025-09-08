import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Post, PostWithLikedAndCount } from 'src/models/post.types';
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
} from 'src/store/user/user-data/user-data.selector';
import { MyprofileTabCommentAddDialogComponent } from '../myprofile-tab-comment-add-dialog/myprofile-tab-comment-add-dialog.component';
import { CommentInsertDto } from 'src/models/comment.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-myprofile-tab-post-item',
  templateUrl: './myprofile-tab-post-item.component.html',
  styleUrls: ['./myprofile-tab-post-item.component.sass'],
})
export class MyprofileTabPostItemComponent implements OnInit, OnDestroy {
  @Input() post: PostWithLikedAndCount | null = null;
  public myUser: UserGetDto | null = null;

  constructor(private readonly store: Store, private dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
  }

  public userInfo$: Observable<UserGetDto> = this.store.select(selectMyUser);
  userSubscription$ = this.store.select(selectMyUser).subscribe((user: UserGetDto) => {
    this.myUser = user;
  });

  ngOnInit(): void {
    this.store.dispatch(
      sendRequestToGetComments({ postId: this.post?.id ?? 0 })
    );
  }

  public likeOrUnlikePost(): void {
    if (!this.post) {
      return;
    }
    if (this.post?.liked === true) {
      this.unlikePost();
    } else {
      this.likePost();
    }
  }

  public likePost(): void {
    this.store.dispatch(
      sendRequestToLikePost({
        userId: this.myUser?.id ?? 0,
        postId: this.post?.id ?? 0,
      })
    );
  }

  public unlikePost(): void {
    this.store.dispatch(
      sendRequestToUnlikePost({
        userId: this.myUser?.id ?? 0,
        postId: this.post?.id ?? 0,
      })
    );
  }

  public deletePost(): void {
    this.store.dispatch(
      sendRequestToDeletePost({ postId: this.post?.id ?? 0 })
    );
  }

  public generateLikeButtonText(post: PostWithLikedAndCount): string {
    return `${post.likedCount} likes`
  }

  public handleAddCommentDialog(): void {
    const dialogRef = this.dialog.open(MyprofileTabCommentAddDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((commentText) => {
      if (commentText) {
        const commentInsertDto = {
          ...commentText,
          postRelatedToId: this.post?.id ?? 0,
          userCommentedId: this.myUser?.id ?? 0,
        };

        if (commentInsertDto) {
          this.store.dispatch(
            sendRequestToAddComment({ commentInsert: commentInsertDto })
          );
        }
      }
    });
  }
}
