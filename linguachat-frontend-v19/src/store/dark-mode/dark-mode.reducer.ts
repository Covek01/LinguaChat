import { createReducer, on } from "@ngrx/store";
import * as DarkModeActions from "./dark-mode.actions";
import { initialStateDarkMode } from "./dark-mode.state";



export const darkModeReducer = createReducer(
    initialStateDarkMode,
    on(DarkModeActions.darkModeEnable, state => ({...state, isDark: true})),
    on(DarkModeActions.darkModeDisable, state => ({...state, isDark: false}))
);