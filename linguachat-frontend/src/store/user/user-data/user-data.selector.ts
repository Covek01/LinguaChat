import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserStoreState } from "./user-data.types";

export const selectMyUser = createSelector(
    createFeatureSelector<UserStoreState>('myUser'),
    (state) =>  {
        return state.user;
    }
)

export const selectMyUserError = createSelector(
    createFeatureSelector<UserStoreState>('myUser'),
    (state) =>  {
        return state.error;
    }
)

export const selectUser = createSelector(
    createFeatureSelector<UserStoreState>('myUser'),
    (state) =>  {
        return state.user;
    }
)

export const selectUserError = createSelector(
    createFeatureSelector<UserStoreState>('myUser'),
    (state) =>  {
        return state.error;
    }
)