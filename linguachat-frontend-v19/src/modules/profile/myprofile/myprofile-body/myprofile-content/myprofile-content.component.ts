import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserGetDto } from 'src/models/user.types';
import { selectAllPosts } from 'src/store/user/post/user-post.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-content',
  templateUrl: './myprofile-content.component.html',
  styleUrls: ['./myprofile-content.component.sass'],
})
export class MyprofileContentComponent {
  userInfo$ = this.store.select(selectMyUser);
  userPosts$ = this.store.select(selectAllPosts);
  @Input() user: UserGetDto = new UserGetDto();
  constructor(private readonly store: Store, private readonly router: Router) {}

  
}
