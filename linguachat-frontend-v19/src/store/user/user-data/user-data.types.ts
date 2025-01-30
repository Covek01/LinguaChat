import { User, UserGetDto } from "src/models/user.types";

export interface UserStoreState {
    user: UserGetDto,
    error: string
}