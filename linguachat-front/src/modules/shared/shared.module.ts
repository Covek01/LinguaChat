import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskbarComponent } from './component/taskbar/taskbar.component';
import { ProbaComponent } from './proba/proba.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [TaskbarComponent, ProbaComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    TaskbarComponent
  ]
})
export class SharedModule { }
