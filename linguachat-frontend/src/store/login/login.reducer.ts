import { createReducer, on } from "@ngrx/store";
import { initialStateLoginUser } from "./login.state";
import * as LoginActions from "./login.actions"

// const loginReducer = createReducer(
//     initialStateLoginUser,
//     on(LoginActions.updateUserInputValues, (state, { newValues }) => ({
//         ...state,
//         username: newValues.username,
//         password: newValues.password
//     })),
//     on(LoginActions.sendLoginRequest, (state, { request }) => {

//     })
// )