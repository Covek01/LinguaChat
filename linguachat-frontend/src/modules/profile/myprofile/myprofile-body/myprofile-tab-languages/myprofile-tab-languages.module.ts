import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileTabNativeLanguagesComponent } from './myprofile-tab-native-languages/myprofile-tab-native-languages.component';
import { MyprofileTabLearningLanguagesComponent } from './myprofile-tab-learning-languages/myprofile-tab-learning-languages.component';
import { MyprofileTabLearningLanguagesAddDialogComponent } from './myprofile-tab-learning-languages-add-dialog/myprofile-tab-learning-languages-add-dialog.component';
import { MyprofileTabNativeLanguagesAddDialogComponent } from './myprofile-tab-native-languages-add-dialog/myprofile-tab-native-languages-add-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MyprofileTabLanguagesComponent } from './myprofile-tab-languages/myprofile-tab-languages.component';
import { MyprofileModule } from '../../myprofile.module';
import { MatTableModule } from '@angular/material/table';
import { MyprofileTabOperationsLanguagesComponent } from './myprofile-tab-operations-languages/myprofile-tab-operations-languages.component';
import { MyprofileTabOperationsLanguagesDialogComponent } from './myprofile-tab-operations-languages-dialog/myprofile-tab-operations-languages-dialog.component';

@NgModule({
  declarations: [
    MyprofileTabNativeLanguagesComponent,
    MyprofileTabLearningLanguagesComponent,
    MyprofileTabLearningLanguagesAddDialogComponent,
    MyprofileTabNativeLanguagesAddDialogComponent,
    MyprofileTabLanguagesComponent,
    MyprofileTabOperationsLanguagesComponent,
    MyprofileTabOperationsLanguagesDialogComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatExpansionModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTableModule,
  ],
  exports: [
    MyprofileTabNativeLanguagesComponent,
    MyprofileTabLearningLanguagesComponent,
    MyprofileTabLearningLanguagesAddDialogComponent,
    MyprofileTabNativeLanguagesAddDialogComponent,
    MyprofileTabLanguagesComponent,
  ],
})
export class MyprofileTabLanguagesModule {}
