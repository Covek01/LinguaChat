import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileBodyComponent } from './myprofile-body/myprofile-body.component';
import { MyprofileBarleftComponent } from './myprofile-barleft/myprofile-barleft.component';
import { MyprofileContentComponent } from './myprofile-content/myprofile-content.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MyprofileBarleftItemComponent } from './myprofile-barleft-item/myprofile-barleft-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MyprofileTabUserInfoComponent } from './myprofile-tab-user-info/myprofile-tab-user-info.component';
import { MyprofileTabLanguagesComponent } from './myprofile-tab-languages/myprofile-tab-languages.component';
import { MyprofileTabPostsComponent } from './myprofile-tab-posts/myprofile-tab-posts.component';
import { MatCardModule } from '@angular/material/card';
import { MyprofileUpdateDialogComponent } from './myprofile-update-dialog/myprofile-update-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    MyprofileBodyComponent,
    MyprofileBarleftComponent,
    MyprofileContentComponent,
    MyprofileBarleftItemComponent,
    MyprofileTabUserInfoComponent,
    MyprofileTabLanguagesComponent,
    MyprofileTabPostsComponent,
    MyprofileUpdateDialogComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatInputModule
  ],
  exports: [
    MyprofileBodyComponent,
    MyprofileBarleftComponent,
    MyprofileContentComponent,
  ],
})
export class MyprofileBodyModule {}
