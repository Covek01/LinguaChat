import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileTabUserInfoComponent } from './user-profile-tab-user-info/user-profile-tab-user-info.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BlockedUserButtonComponent } from './blocked-user-button/blocked-user-button.component';

@NgModule({
  declarations: [UserProfileTabUserInfoComponent, BlockedUserButtonComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [UserProfileTabUserInfoComponent, BlockedUserButtonComponent],
})
export class UserProfileTabUserInfoModule {}
