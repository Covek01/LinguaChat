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


@NgModule({
  declarations: [MyprofileTabPostsComponent, MyprofileTabPostItemComponent, MyprofileTabCommentsComponent, MyprofileTabCommentsItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatExpansionModule
  ],
  exports: [
    MyprofileTabPostsComponent
  ]
})
export class MyprofileTabPostsModule { }
