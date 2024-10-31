import { EffectsModule } from "@ngrx/effects";
import { DarkModeEffects } from "../dark-mode/dark-mode.effects";

export const ngEffectsNames = EffectsModule.forRoot([
    DarkModeEffects,
])