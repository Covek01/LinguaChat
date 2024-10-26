import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DarkMode } from "./dark-mode.types";

export const selectDarkModeEnabled = createSelector(
    createFeatureSelector<DarkMode>('darkMode'),
    (darkMode) =>  {
        const isDark = darkMode.isDark;
        console.log("On selector isDark is: " + isDark)
        localStorage.setItem('darkMode', JSON.stringify(isDark));
        return isDark;
    }
)