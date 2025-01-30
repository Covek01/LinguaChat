import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginResponse } from "./login.types";

export const selectLoginResponse = createSelector(
    createFeatureSelector<LoginResponse>('loginState'),
    (loginState) =>  {
        return loginState.jwtToken;
    }
)

export const selectLoginError = createSelector(
    createFeatureSelector<LoginResponse>('loginState'),
    (loginState) =>  {
        return loginState.error;
    }
)