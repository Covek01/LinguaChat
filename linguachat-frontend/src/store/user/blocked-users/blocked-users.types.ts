import { UserGetDto } from "src/models/user.types";

export type User = UserGetDto;

export interface BlockedUsersState extends EntityState<UserGetDto> {}
