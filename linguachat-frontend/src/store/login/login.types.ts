import { UserInterface } from "src/models/user.types"

export interface LoginRequest {
    username: string,
    password: string
}

export interface LoginResponse {
    jwtToken: boolean,
    error: string,
}

