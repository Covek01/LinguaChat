import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostWithLikedAndCount } from 'src/models/post.types';
import { UserGetDto } from 'src/models/user.types';
import { selectAllPosts } from 'src/store/user/post/user-post.selector';
import {
  selectUser,
} from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-user-profile-content',
  templateUrl: './user-profile-content.component.html',
  styleUrls: ['./user-profile-content.component.sass'],
})
export class UserProfileContentComponent {
  @Input() user: UserGetDto = new UserGetDto();

  constructor(private readonly store: Store) {}

  public userInfo$: Observable<UserGetDto> = this.store.select(selectUser);

  public userPosts$: Observable<PostWithLikedAndCount[]> =
    this.store.select(selectAllPosts);
}
