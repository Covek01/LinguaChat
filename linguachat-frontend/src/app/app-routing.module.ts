import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { LoginComponent } from 'src/modules/login/login/login.component';
import { MyprofileComponent } from 'src/modules/profile/myprofile/myprofile/myprofile.component';
import { TaskbarComponent } from 'src/modules/shared/taskbar/taskbar-component/taskbar.component';
import { SignupComponent } from 'src/modules/signup/signup/signup.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent}
    ],
  },
  {
    path: 'user',
    children: [
      {path: 'myprofile', component: MyprofileComponent},
      // {path: ':id', component: MyprofileComponent}
    ],
  },
  {
    path:'', redirectTo: '/auth/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
