import { createAction, emptyProps, props } from "@ngrx/store"
import { LoginRequest, LoginResponse } from "./login.types"
import { UserGetDto } from "src/models/user.types"

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
    props<{jwtToken: string}>()
)

export const sendLogoutRequest = createAction(
    '[Login] Send Logout Request',
    emptyProps
)

export const getLogoutResponse = createAction(
    '[Login] Get Logout Response',
    emptyProps
)

export const getLoginError = createAction(
    '[Login] Get Login Error',
    props<{error: string}>()
)