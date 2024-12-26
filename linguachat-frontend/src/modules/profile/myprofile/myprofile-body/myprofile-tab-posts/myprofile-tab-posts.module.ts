import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileTabPostsComponent } from './myprofile-tab-posts/myprofile-tab-posts.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MyprofileTabPostItemComponent } from './myprofile-tab-post-item/myprofile-tab-post-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [MyprofileTabPostsComponent, MyprofileTabPostItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MyprofileTabPostsComponent
  ]
})
export class MyprofileTabPostsModule { }
