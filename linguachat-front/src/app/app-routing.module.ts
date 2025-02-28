import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskbarComponent } from 'src/modules/shared/component/taskbar/taskbar.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {path: 'login', component: TaskbarComponent},
      {path: 'signin', component: TaskbarComponent}
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
