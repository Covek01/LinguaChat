import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { ProfileSearchBodyComponent } from './profile-search-body/profile-search-body.component';
import { TaskbarModule } from '../shared/taskbar/taskbar.module';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FiltersComponent } from './filters/filters.component';
import { FilteredProfilesComponent } from './filtered-profiles/filtered-profiles.component';
import { MyprofileBodyModule } from "../profile/myprofile/myprofile-body/myprofile-body.module";
import { MyprofileBarleftModule } from '../profile/myprofile/myprofile-barleft/myprofile-barleft.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserProfileBodyModule } from '../profile/user-profile/user-profile-body/user-profile-body.module';
import { UserProfileTabUserInfoModule } from '../profile/user-profile/user-profile-body/user-profile-tab-user-info/user-profile-tab-user-info.module';

@NgModule({
  declarations: [ProfileSearchComponent, ProfileSearchBodyComponent, FiltersComponent, FilteredProfilesComponent],
  imports: [
    CommonModule,
    TaskbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MyprofileBodyModule,
    MyprofileBarleftModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    UserProfileTabUserInfoModule
],
})
export class ProfileSearchModule {}
