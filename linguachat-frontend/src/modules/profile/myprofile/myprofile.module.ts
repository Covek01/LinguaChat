import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { TaskbarModule } from "../../shared/taskbar/taskbar.module";



@NgModule({
  declarations: [
    MyprofileComponent,
  ],
  imports: [
    CommonModule,
    TaskbarModule
]
})
export class MyprofileModule { }
