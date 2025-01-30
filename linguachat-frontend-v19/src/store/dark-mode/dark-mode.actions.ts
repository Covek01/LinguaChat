import { createAction, emptyProps, props } from "@ngrx/store";
import { DarkMode } from "./dark-mode.types";

export const darkModeEnable = createAction(
    '[Dark Mode] Enable Dark Mode',
    emptyProps
);

export const darkModeDisable = createAction(
    '[Dark Mode] Disable Dark Mode',
    emptyProps
);