import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserGetDto } from 'src/models/user.types';
import { selectAllPosts } from 'src/store/user/post/user-post.selector';
import { selectMyUser, selectUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-user-profile-content',
  templateUrl: './user-profile-content.component.html',
  styleUrls: ['./user-profile-content.component.sass'],
})
export class UserProfileContentComponent {
  userInfo$ = this.store.select(selectUser);
  userPosts$ = this.store.select(selectAllPosts);
  @Input() user: UserGetDto = new UserGetDto();
  constructor(private readonly store: Store, private readonly router: Router) {}
}
