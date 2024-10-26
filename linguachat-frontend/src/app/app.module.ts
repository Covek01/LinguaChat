import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskbarModule } from 'src/modules/shared/taskbar/taskbar.module';
import { LoginModule } from 'src/modules/login/login.module';
import { SignupModule } from 'src/modules/signup/signup.module';
import { StoreModule } from '@ngrx/store';
import { darkModeReducer } from 'src/store/dark-mode/dark-mode.reducer';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TaskbarModule,
    LoginModule,
    BrowserAnimationsModule,
    SignupModule,
    StoreModule.forRoot({ darkMode: darkModeReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
