import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { TaskbarModule } from '../shared/taskbar/taskbar.module';
import { SignupFormModule } from './signup-form/signup-form.module';



@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    TaskbarModule,
    SignupFormModule
  ],
})
export class SignupModule { }
