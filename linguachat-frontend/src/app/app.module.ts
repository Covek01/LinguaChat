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
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http'
import { ngStoreNames } from 'src/store/config/store.names';
import { ngEffectsNames } from 'src/store/config/store.effect.names';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ngReduxDevtoolsConfig } from 'src/store/config/ng.redux-devtools.config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MyprofileModule } from 'src/modules/profile/myprofile/myprofile.module';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { MatInputModule } from '@angular/material/input';
import { UserProfileModule } from 'src/modules/profile/user-profile/user-profile.module';

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
    ngStoreNames,
    ngEffectsNames,
    HttpClientModule,
    StoreDevtoolsModule.instrument(ngReduxDevtoolsConfig),
    MatInputModule,
    MyprofileModule,
    UserProfileModule,
  ],
  providers: [
    CookieService,
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
