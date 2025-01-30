import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileBodyComponent } from './myprofile-body/myprofile-body.component';
import { MyprofileContentComponent } from './myprofile-content/myprofile-content.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MyprofileTabUserInfoComponent } from './myprofile-tab-user-info/myprofile-tab-user-info.component';
import { MatCardModule } from '@angular/material/card';
import { MyprofileUpdateDialogComponent } from './myprofile-update-dialog/myprofile-update-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MyprofileBarleftModule } from '../myprofile-barleft/myprofile-barleft.module';
import { MyprofileTabPostsModule } from './myprofile-tab-posts/myprofile-tab-posts.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MyprofileTabLanguagesModule } from './myprofile-tab-languages/myprofile-tab-languages.module';


@NgModule({
  declarations: [
    MyprofileBodyComponent,
    MyprofileContentComponent,
    MyprofileTabUserInfoComponent,
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
    MatInputModule,
    MatAutocompleteModule,
    MyprofileBarleftModule,
    MyprofileTabPostsModule,
    MyprofileTabLanguagesModule
  ],
  exports: [MyprofileBodyComponent, MyprofileContentComponent],
})
export class MyprofileBodyModule {}
