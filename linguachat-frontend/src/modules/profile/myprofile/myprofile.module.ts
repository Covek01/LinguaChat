import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { TaskbarModule } from '../../shared/taskbar/taskbar.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MyprofileBodyModule } from './myprofile-body/myprofile-body.module';

@NgModule({
  declarations: [MyprofileComponent],
  imports: [
    CommonModule,
    TaskbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MyprofileBodyModule
  ],
  exports: [
    MyprofileComponent,
  ]
})
export class MyprofileModule {}
