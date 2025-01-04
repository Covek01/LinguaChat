import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyprofileModule } from '../myprofile/myprofile.module';
import { MyprofileBodyModule } from '../myprofile/myprofile-body/myprofile-body.module';



@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    MyprofileBodyModule,
  ]
})
export class UserProfileModule { }
