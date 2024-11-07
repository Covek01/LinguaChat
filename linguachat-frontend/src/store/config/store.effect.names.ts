import { EffectsModule } from "@ngrx/effects";
import { DarkModeEffects } from "../dark-mode/dark-mode.effects";
import { LoginEffects } from "../login/login.effects";
import { SignupEffects } from "../signup/signup.effects";
import { UserDataEffects } from "../user/user-data/user-data.effects";

export const ngEffectsNames = EffectsModule.forRoot([
    DarkModeEffects,
    LoginEffects,
    SignupEffects,
    UserDataEffects
])