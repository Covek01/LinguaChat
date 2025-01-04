import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileBodyComponent } from './user-profile-body/user-profile-body.component';



@NgModule({
  declarations: [
    UserProfileBodyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserProfileBodyComponent
  ]
})
export class UserProfileBodyModule { }
