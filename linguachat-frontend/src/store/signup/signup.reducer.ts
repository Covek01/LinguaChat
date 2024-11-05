import { createReducer, on } from "@ngrx/store";
import { initialStateSignupContext } from "./signup.state";
import * as SignupActions from "./signup.actions";

export const loginReducer = createReducer(
    initialStateSignupContext,
    on(SignupActions.getSignupResponse, (state, { response }) => ({
        ...state,
        response: response
    })),
    on(SignupActions.getSignupError, (state, { error }) => ({
        ...state,
        error: error
    }))
)