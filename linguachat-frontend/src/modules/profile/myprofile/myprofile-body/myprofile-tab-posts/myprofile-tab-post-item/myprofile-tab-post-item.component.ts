import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs';
import { PostWithLikedAndCount } from 'src/models/post.types';
import { UserGetDto } from 'src/models/user.types';
import { sendRequestToGetComments } from 'src/store/comment/comment.actions';
import {
  sendRequestToLikePost,
  sendRequestToUnlikePost,
} from 'src/store/user/post/user-post.actions';
import {
  selectMyUser,
  selectUser,
} from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-tab-post-item',
  templateUrl: './myprofile-tab-post-item.component.html',
  styleUrls: ['./myprofile-tab-post-item.component.sass'],
})
export class MyprofileTabPostItemComponent implements OnInit {
  @Input() post: PostWithLikedAndCount | null = null;
  constructor(private readonly store: Store) {}

  user: UserGetDto | null = null;
  userInfo$ = this.store.select(selectMyUser);
  user$ = this.store.select(selectMyUser).subscribe((user) => {
    this.user = user;
  });
  ngOnInit(): void {
    this.store.dispatch(
      sendRequestToGetComments({ postId: this.post?.id ?? 0 })
    );
  }

  likeOrUnlikePost() {
    if (!this.post) {
      return;
    }
    if (this.post?.liked === true) {
      this.unlikePost();
    } else {
      this.likePost();
    }
  }

  likePost() {
    this.store.dispatch(
      sendRequestToLikePost({
        userId: this.user?.id ?? 0,
        postId: this.post?.id ?? 0,
      })
    );
  }

  unlikePost() {
    this.store.dispatch(
      sendRequestToUnlikePost({
        userId: this.user?.id ?? 0,
        postId: this.post?.id ?? 0,
      })
    );
  }
}
