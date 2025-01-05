import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyprofileBodyModule } from '../myprofile/myprofile-body/myprofile-body.module';
import { MyprofileTabPostsModule } from '../myprofile/myprofile-body/myprofile-tab-posts/myprofile-tab-posts.module';
import { TaskbarModule } from 'src/modules/shared/taskbar/taskbar.module';
import { UserProfileBodyModule } from './user-profile-body/user-profile-body.module';
import { UserProfileTabLanguagesModule } from './user-profile-body/user-profile-tab-languages/user-profile-tab-languages.module';
import { UserProfileTabPostsModule } from './user-profile-body/user-profile-tab-posts/user-profile-tab-posts.module';
import { UserProfileTabUserInfoModule } from './user-profile-body/user-profile-tab-user-info/user-profile-tab-user-info.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    MyprofileBodyModule,
    MyprofileTabPostsModule,
    TaskbarModule,
    UserProfileBodyModule,
    
  ],
})
export class UserProfileModule {}
