import { EntityState } from "@ngrx/entity";
import { UserGetDto } from "src/models/user.types";

export interface ConnectionsState extends EntityState<UserGetDto> {}