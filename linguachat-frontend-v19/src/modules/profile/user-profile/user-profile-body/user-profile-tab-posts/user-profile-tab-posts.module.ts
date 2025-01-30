import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileTabPostsComponent } from './user-profile-tab-posts/user-profile-tab-posts.component';
import { MyprofileTabPostsModule } from 'src/modules/profile/myprofile/myprofile-body/myprofile-tab-posts/myprofile-tab-posts.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [UserProfileTabPostsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MyprofileTabPostsModule,
  ],
  exports: [
    UserProfileTabPostsComponent
  ]
})
export class UserProfileTabPostsModule { }
