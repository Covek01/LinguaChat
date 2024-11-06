import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SignupContext } from "./signup.types";

export const selectSignupResponse = createSelector(
    createFeatureSelector<SignupContext>('signupState'),
    (signupState) =>  {
        return signupState.response;
    }
)

export const selectSignupError = createSelector(
    createFeatureSelector<SignupContext>('signupState'),
    (signupState) =>  {
        return signupState.error;
    }
)