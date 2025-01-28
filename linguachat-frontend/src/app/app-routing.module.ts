import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ChatComponent } from 'src/modules/chat/chat/chat.component';
import { FeedComponent } from 'src/modules/feed/feed/feed.component';
import { LoginComponent } from 'src/modules/login/login/login.component';
import { ProfileSearchComponent } from 'src/modules/profile-search/profile-search/profile-search.component';
import { MyprofileComponent } from 'src/modules/profile/myprofile/myprofile/myprofile.component';
import { UserProfileComponent } from 'src/modules/profile/user-profile/user-profile/user-profile.component';
import { TaskbarComponent } from 'src/modules/shared/taskbar/taskbar-component/taskbar.component';
import { SignupComponent } from 'src/modules/signup/signup/signup.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  {
    path: 'user',
    children: [
      { path: 'myprofile', component: MyprofileComponent },
      { path: ':id', component: UserProfileComponent },
    ],
  },
  {
    path: 'search',
    component: ProfileSearchComponent,
  },
  {
    path: 'feed',
    component: FeedComponent,
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
