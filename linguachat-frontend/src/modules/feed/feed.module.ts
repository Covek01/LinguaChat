import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { TaskbarModule } from '../shared/taskbar/taskbar.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MyprofileBodyModule } from '../profile/myprofile/myprofile-body/myprofile-body.module';
import { MyprofileBarleftModule } from '../profile/myprofile/myprofile-barleft/myprofile-barleft.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileTabUserInfoModule } from '../profile/user-profile/user-profile-body/user-profile-tab-user-info/user-profile-tab-user-info.module';
import { MyprofileTabPostsModule } from '../profile/myprofile/myprofile-body/myprofile-tab-posts/myprofile-tab-posts.module';
import { FeedFiltersComponent } from './feed-filters/feed-filters.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [FeedComponent, FeedFiltersComponent, PostsComponent],
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
    UserProfileTabUserInfoModule,
    MyprofileTabPostsModule
  ],
})
export class FeedModule {}
