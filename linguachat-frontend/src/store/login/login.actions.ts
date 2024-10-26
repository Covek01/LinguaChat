import { createAction, props } from "@ngrx/store"
import { LoginRequest, LoginResponse } from "./login.types"

export const updateUserInputValues = createAction(
    '[Login] Update User Inputs',
    props<{newValues: LoginRequest}>()
)

export const sendLoginRequest = createAction(
    '[Login] Send Login Request',
    props<{request: LoginRequest}>()
)

export const getLoginResponse = createAction(
    '[Login] Get Login Response',
    props<{request: LoginResponse}>()
)

export const getLoginError = createAction(
    '[Login] Get Login Error',
    props<{request: LoginResponse}>()
)