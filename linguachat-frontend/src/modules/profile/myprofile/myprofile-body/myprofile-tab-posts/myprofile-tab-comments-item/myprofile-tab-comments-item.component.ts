import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommentGetDto } from 'src/models/comment.types';
import { PostGetDto } from 'src/models/post.types';
import { UserGetDto } from 'src/models/user.types';
import { sendRequestToDeleteComment } from 'src/store/comment/comment.actions';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-tab-comments-item',
  templateUrl: './myprofile-tab-comments-item.component.html',
  styleUrls: ['./myprofile-tab-comments-item.component.sass'],
})
export class MyprofileTabCommentsItemComponent implements OnDestroy {
  @Input() comment: CommentGetDto | null = null;
  @Input() post: PostGetDto | null = null;
  constructor(private readonly store: Store) {}

  public user: UserGetDto | null = null;

  private userSubscription$ = this.store
    .select(selectMyUser)
    .subscribe((user: UserGetDto) => {
      this.user = user;
    });

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
  }

  public deleteComment(): void {
    this.store.dispatch(
      sendRequestToDeleteComment({ commentId: this.comment?.id ?? 0 })
    );
  }
}
