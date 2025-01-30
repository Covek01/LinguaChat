import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { TaskbarModule } from 'src/modules/shared/taskbar/taskbar.module';
import { LoginModule } from 'src/modules/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupModule } from 'src/modules/signup/signup.module';
import { ngStoreNames } from 'src/store/config/store.names';
import { ngEffectsNames } from 'src/store/config/store.effect.names';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ngReduxDevtoolsConfig } from 'src/store/config/ng.redux-devtools.config';
import { MatInputModule } from '@angular/material/input';
import { MyprofileModule } from 'src/modules/profile/myprofile/myprofile.module';
import { UserProfileModule } from 'src/modules/profile/user-profile/user-profile.module';
import { ProfileSearchModule } from 'src/modules/profile-search/profile-search.module';
import { FeedModule } from 'src/modules/feed/feed.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChatModule } from 'src/modules/chat/chat.module';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
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
      ProfileSearchModule,
      FeedModule,
      MatSnackBarModule,
      ChatModule
    ),
    CookieService,
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};
