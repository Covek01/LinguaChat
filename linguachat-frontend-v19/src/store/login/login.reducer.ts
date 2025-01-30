import { createReducer, on } from "@ngrx/store";
import { initialStateLoginStatus } from "./login.state";
import * as LoginActions from "./login.actions"

export const loginReducer = createReducer(
    initialStateLoginStatus,
    on(LoginActions.getLoginResponse, (state, { jwtToken }) => ({
        ...state,
        jwtToken: true
    })),
    on(LoginActions.getLoginError, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(LoginActions.getLogoutResponse, (state) => ({
        ...state,
        jwtToken: false
    })),
)