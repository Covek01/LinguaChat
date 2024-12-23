import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileBodyComponent } from './myprofile-body/myprofile-body.component';
import { MyprofileBarleftComponent } from './myprofile-barleft/myprofile-barleft.component';
import { MyprofileContentComponent } from './myprofile-content/myprofile-content.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    MyprofileBodyComponent,
    MyprofileBarleftComponent,
    MyprofileContentComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    MyprofileBodyComponent,
    MyprofileBarleftComponent,
    MyprofileContentComponent
  ]
})
export class MyprofileBodyModule { }
