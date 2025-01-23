import { LoginRequest, LoginResponse } from "./login.types"

export const initialStateLoginUser = {
    username: '',
    password: ''
}

export const initialStateLoginStatus: LoginResponse = {
    jwtToken: false,
    error: '',
}