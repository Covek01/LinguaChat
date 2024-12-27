import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostWithLikedAndCount } from 'src/models/post.types';
import { sendRequestToGetComments } from 'src/store/comment/comment.actions';
import { selectMyUser, selectUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-tab-post-item',
  templateUrl: './myprofile-tab-post-item.component.html',
  styleUrls: ['./myprofile-tab-post-item.component.sass'],
})
export class MyprofileTabPostItemComponent implements OnInit {
  @Input() post: PostWithLikedAndCount | null = null;
  constructor(private readonly store: Store) {}

  userInfo$ = this.store.select(selectMyUser);
  ngOnInit(): void {
    this.store.dispatch(
      sendRequestToGetComments({ postId: this.post?.id ?? 0 })
    );
  }
}
