import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostWithLikedAndCount } from 'src/models/post.types';
import { UserGetDto } from 'src/models/user.types';
import { selectAllPosts } from 'src/store/user/post/user-post.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-content',
  templateUrl: './myprofile-content.component.html',
  styleUrls: ['./myprofile-content.component.sass'],
})
export class MyprofileContentComponent {
  @Input() user: UserGetDto = new UserGetDto();

  constructor(private readonly store: Store) {}

  userInfo$: Observable<UserGetDto> = this.store.select(selectMyUser);
  userPosts$: Observable<PostWithLikedAndCount[]> =
    this.store.select(selectAllPosts);
}
