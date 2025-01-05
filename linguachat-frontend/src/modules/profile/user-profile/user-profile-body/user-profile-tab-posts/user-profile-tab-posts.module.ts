import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileTabPostsComponent } from './user-profile-tab-posts/user-profile-tab-posts.component';



@NgModule({
  declarations: [UserProfileTabPostsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    UserProfileTabPostsComponent
  ]
})
export class UserProfileTabPostsModule { }
