import { UserGetDto } from "src/models/user.types";
import { UserStoreState } from "./user-data.types";

export const initialStateUser: UserStoreState = {
    user: new UserGetDto(),
    error: ''
}