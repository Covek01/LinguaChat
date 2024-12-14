import { createAction, emptyProps, props } from "@ngrx/store";
import { UserGetDto, UserInsertDto, UserUpdateDto } from "src/models/user.types";

export const sendRequestToGetUser = createAction(
    '[User] Send Request To Get User',
    props<{id: number}>()
)

export const sendRequestToGetMyUser = createAction(
    '[User] Send Request To Get My User',
    emptyProps
)

export const sendRequestToUpdateMyUser = createAction(
    '[User] Send Request To Update My User',
    props<{user: UserGetDto}>()
)

export const getResponse = createAction(
    '[User] Get Response',
    props<{user: UserGetDto}>()
)

export const getResponseForMyUser = createAction(
    '[User] Get Response For My User',
    props<{user: UserGetDto}>()
)

export const getError = createAction(
    '[User] Get Error',
    props<{error: string}>()
)