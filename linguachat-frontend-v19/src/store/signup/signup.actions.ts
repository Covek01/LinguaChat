import { createAction, props } from "@ngrx/store"
import { UserInsertDto } from "src/models/user.types"

export const sendSignupRequest = createAction(
    '[Signup] Send Signup Request',
    props<{user: UserInsertDto}>()
)

export const getSignupResponse = createAction(
    '[Signup] Get Signup Response',
    props<{response: string}>()
)

export const getSignupError = createAction(
    '[Signup] Get Signup Error',
    props<{error: string}>()
)