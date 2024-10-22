import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/modules/login/login/login.component';
import { TaskbarComponent } from 'src/modules/shared/taskbar/taskbar-component/taskbar.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: TaskbarComponent}
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
