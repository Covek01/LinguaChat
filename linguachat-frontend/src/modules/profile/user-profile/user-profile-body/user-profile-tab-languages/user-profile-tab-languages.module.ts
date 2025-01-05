import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileTabLanguagesComponent } from './user-profile-tab-languages/user-profile-tab-languages.component';



@NgModule({
  declarations: [UserProfileTabLanguagesComponent],
  imports: [
    CommonModule
  ],
  exports: [UserProfileTabLanguagesComponent]
})
export class UserProfileTabLanguagesModule { }
