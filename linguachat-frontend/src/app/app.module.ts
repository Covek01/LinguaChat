import { NgModule, isDevMode } from '@angular/core';
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
import { CookieService } from 'ngx-cookie-service';
import { EffectsModule } from '@ngrx/effects';
import { DarkModeEffects } from 'src/store/dark-mode/dark-mode.effects';
import { provideHttpClient } from '@angular/common/http'
import { ngStoreNames } from 'src/store/config/store.names';
import { ngEffectsNames } from 'src/store/config/store.effect.names';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ngReduxDevtoolsConfig } from 'src/store/config/ng.redux-devtools.config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MyprofileModule } from 'src/modules/profile/myprofile/myprofile.module';

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
    MyprofileModule,
    ngStoreNames,
    ngEffectsNames,
    StoreDevtoolsModule.instrument(ngReduxDevtoolsConfig),
  ],
  providers: [
    CookieService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
