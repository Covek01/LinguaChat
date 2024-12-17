import { UserGetDto } from "src/models/user.types";
import { User } from "src/modules/user/user.entity";

export function removePassHash(user: User): UserGetDto {
    const {passHash, ...userWithoutPassHash} = user;
    return userWithoutPassHash
}