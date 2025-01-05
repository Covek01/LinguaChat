import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileBodyComponent } from './user-profile-body/user-profile-body.component';
import { MyprofileBarleftModule } from '../../myprofile/myprofile-barleft/myprofile-barleft.module';
import { UserProfileContentComponent } from './user-profile-content/user-profile-content.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { UserProfileTabLanguagesModule } from './user-profile-tab-languages/user-profile-tab-languages.module';
import { UserProfileTabPostsModule } from './user-profile-tab-posts/user-profile-tab-posts.module';
import { UserProfileTabUserInfoModule } from './user-profile-tab-user-info/user-profile-tab-user-info.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    UserProfileBodyComponent,
    UserProfileContentComponent,
  ],
  imports: [
    CommonModule,
    MyprofileBarleftModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    UserProfileTabLanguagesModule,
    UserProfileTabPostsModule,
    UserProfileTabUserInfoModule,
  ],
  exports: [
    UserProfileBodyComponent,
  ]
})
export class UserProfileBodyModule { }
