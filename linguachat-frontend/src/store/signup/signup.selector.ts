import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SignupContext } from "./signup.types";

export const selectLoginResponse = createSelector(
    createFeatureSelector<SignupContext>('signupState'),
    (signupState) =>  {
        return signupState.response;
    }
)

export const selectLoginError = createSelector(
    createFeatureSelector<SignupContext>('signupState'),
    (signupState) =>  {
        return signupState.error;
    }
)