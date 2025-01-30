import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskbarComponent } from './taskbar-component/taskbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { darkModeReducer } from 'src/store/dark-mode/dark-mode.reducer';
import { NotificationsComponent } from './notifications/notifications.component';
import { ActionsComponent } from './actions/actions.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { ProfileSearchButtonComponent } from './profile-search-button/profile-search-button.component';
import { FeedButtonComponent } from './feed-button/feed-button.component';
import { ChatButtonComponent } from './chat-button/chat-button.component';

@NgModule({
  declarations: [TaskbarComponent, NotificationsComponent, ActionsComponent, ProfileSearchButtonComponent, FeedButtonComponent, ChatButtonComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [TaskbarComponent]
})
export class TaskbarModule { }
