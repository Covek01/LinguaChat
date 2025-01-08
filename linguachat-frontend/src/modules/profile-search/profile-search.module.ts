import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { ProfileSearchBodyComponent } from './profile-search-body/profile-search-body.component';



@NgModule({
  declarations: [
    ProfileSearchComponent,
    ProfileSearchBodyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileSearchModule { }
