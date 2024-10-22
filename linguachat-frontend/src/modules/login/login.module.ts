import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form/login-form.component';
import { TaskbarModule } from '../shared/taskbar/taskbar.module';
import { LoginFormModule } from './login-form/login-form.module';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    TaskbarModule,
    LoginFormModule
  ]
})
export class LoginModule { }
