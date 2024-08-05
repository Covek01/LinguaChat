import { UserInterface } from "./user.types";

export interface ConnectionInterface {
    id: number,
    since: Date,
    connectionName: string
}

export class ConnectionGetDto implements ConnectionInterface {
    id: number;
    since: Date;
    connectionName: string;
    firstUser: UserInterface;
    secondUser: UserInterface;
}

export class CreateConnectionDto {
    firstUserId: number; // ID of the first user in the connection
    secondUserId: number; // ID of the second user in the connection
}

// update-connection.dto.ts
export class UpdateConnectionDto {
    since?: Date;
    connectionName: string;
    firstUserId: number; // Optionally update the first user
    secondUserId: number; // Optionally update the second user
}
  
  