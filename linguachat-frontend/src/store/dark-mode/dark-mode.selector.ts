import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DarkMode } from "./dark-mode.types";

export const selectDarkModeEnabled = createSelector(
    createFeatureSelector<DarkMode>('darkMode'),
    (darkMode) => darkMode.isDark
)