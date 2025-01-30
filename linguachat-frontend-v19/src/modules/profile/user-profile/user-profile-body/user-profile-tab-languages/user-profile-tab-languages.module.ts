import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileTabLanguagesComponent } from './user-profile-tab-languages/user-profile-tab-languages.component';
import { UserProfileLearningLanguagesComponent } from './user-profile-learning-languages/user-profile-learning-languages.component';
import { UserProfileNativeLanguagesComponent } from './user-profile-native-languages/user-profile-native-languages.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [UserProfileTabLanguagesComponent, UserProfileLearningLanguagesComponent, UserProfileNativeLanguagesComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [UserProfileTabLanguagesComponent]
})
export class UserProfileTabLanguagesModule { }
