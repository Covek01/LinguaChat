import { createAction, emptyProps, props } from "@ngrx/store";
import { UserGetDto, UserInsertDto, UserUpdateDto } from "src/models/user.types";

export const sendRequestToGetUser = createAction(
    '[User Data] Send Request To Get User',
    props<{id: number}>()
)

export const sendRequestToGetMyUser = createAction(
    '[User Data] Send Request To Get My User',
    emptyProps
)

export const sendRequestToUpdateMyUser = createAction(
    '[User Data] Send Request To Update My User',
    props<{user: UserGetDto}>()
)

export const getResponse = createAction(
    '[User Data] Get Response',
    props<{user: UserGetDto}>()
)

export const getResponseForMyUser = createAction(
    '[User Data] Get Response For My User',
    props<{user: UserGetDto}>()
)

export const getError = createAction(
    '[User Data] Get Error',
    props<{error: string}>()
)