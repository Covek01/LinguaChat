import { EffectsModule } from '@ngrx/effects';
import { DarkModeEffects } from '../dark-mode/dark-mode.effects';
import { LoginEffects } from '../login/login.effects';
import { SignupEffects } from '../signup/signup.effects';
import { UserDataEffects } from '../user/user-data/user-data.effects';
import { BlockedUserEffects } from '../user/blocked-users/blocked-users.effects';
import { ConnectionsEffects } from '../user/connections/connections.effects';
import { LanguagesLearningEffects } from '../user/languages-learning/languages-learning.effects';
import { LanguagesNativeEffects } from '../user/languages-native/languages-native.effects';

export const ngEffectsNames = EffectsModule.forRoot([
  DarkModeEffects,
  LoginEffects,
  SignupEffects,
  UserDataEffects,
  BlockedUserEffects,
  ConnectionsEffects,
  LanguagesLearningEffects,
  LanguagesNativeEffects,
]);
