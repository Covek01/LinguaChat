import { UserGetDto, UserInterface } from './user.types';

export interface ConnectionInterface {
  id: number;
  since: Date;
  connectionName: string;
}

export class ConnectionGetDto implements ConnectionInterface {
  id: number;
  since: Date;
  connectionName: string;
  firstUser: UserGetDto;
  secondUser: UserGetDto;
}

export class CreateConnectionDto {
  firstUserId: number; // ID of the first user in the connection
  secondUserId: number; // ID of the second user in the connection
}

export interface ConnectionWithoutId {
  since: Date;
  connectionName: string;
  firstUser: UserGetDto;
  secondUser: UserGetDto;
}

// update-connection.dto.ts
export class UpdateConnectionDto {
  since?: Date;
  connectionName: string;
  firstUserId: number; // Optionally update the first user
  secondUserId: number; // Optionally update the second user
}
