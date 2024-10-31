import { createReducer, on } from "@ngrx/store";
import { initialStateLoginStatus, initialStateLoginUser } from "./login.state";
import * as LoginActions from "./login.actions"

export const loginReducer = createReducer(
    initialStateLoginStatus,
    on(LoginActions.getLoginResponse, (state, { jwtToken }) => ({
        ...state,
        jwtToken: jwtToken
    })),
    on(LoginActions.getLoginError, (state, { error }) => ({
        ...state,
        error: error
    }))
)