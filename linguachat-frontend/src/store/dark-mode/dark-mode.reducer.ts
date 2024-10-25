import { createReducer, on } from "@ngrx/store";
import { DarkMode } from "./dark-mode.types";
import * as DarkModeActions from "./dark-mode.actions";
import { Action } from "rxjs/internal/scheduler/Action";
import { initialStateDarkMode } from "./dark-mode.state";



export const darkModeReducer = createReducer(
    initialStateDarkMode,
    on(DarkModeActions.darkModeEnable, state => ({...state, isDark: true})),
    on(DarkModeActions.darkModeDisable, state => ({...state, isDark: false}))
);