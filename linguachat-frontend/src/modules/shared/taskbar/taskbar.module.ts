import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskbarComponent } from './taskbar-component/taskbar.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [TaskbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class TaskbarModule { }
