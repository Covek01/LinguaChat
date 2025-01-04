import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileTabPostsComponent } from './myprofile-tab-posts/myprofile-tab-posts.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MyprofileTabPostItemComponent } from './myprofile-tab-post-item/myprofile-tab-post-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MyprofileTabCommentsComponent } from './myprofile-tab-comments/myprofile-tab-comments.component';
import { MyprofileTabCommentsItemComponent } from './myprofile-tab-comments-item/myprofile-tab-comments-item.component';
import { MyprofileModule } from '../../myprofile.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MyprofileTabPostAddDialogComponent } from './myprofile-tab-post-add-dialog/myprofile-tab-post-add-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MyprofileTabCommentAddComponent } from './myprofile-tab-comment-add/myprofile-tab-comment-add.component';
import { MyprofileTabCommentAddDialogComponent } from './myprofile-tab-comment-add-dialog/myprofile-tab-comment-add-dialog.component';

@NgModule({
  declarations: [
    MyprofileTabPostsComponent,
    MyprofileTabPostItemComponent,
    MyprofileTabCommentsComponent,
    MyprofileTabCommentsItemComponent,
    MyprofileTabPostAddDialogComponent,
    MyprofileTabCommentAddComponent,
    MyprofileTabCommentAddDialogComponent,
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
  ],
  exports: [
    MyprofileTabPostsComponent,
    MyprofileTabCommentsComponent,
    MyprofileTabPostItemComponent,
    MyprofileTabCommentsItemComponent
  ],
})
export class MyprofileTabPostsModule {}
