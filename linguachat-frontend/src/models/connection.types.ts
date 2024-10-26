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

    constructor(id: number, since: Date, connectionName: string, firstUser: UserInterface, secondUser: UserInterface) {
        this.id = id;
        this.since = since;
        this.connectionName = connectionName;
        this.firstUser = firstUser;
        this.secondUser = secondUser;
    }
}

export class CreateConnectionDto {
    firstUserId: number; // ID of the first user in the connection
    secondUserId: number; // ID of the second user in the connection

    constructor(firstUserId: number, secondUserId: number) {
        this.firstUserId = firstUserId;
        this.secondUserId = secondUserId;
    }
}

export class UpdateConnectionDto {
    since?: Date;
    connectionName: string;
    firstUserId: number; // Optionally update the first user
    secondUserId: number; // Optionally update the second user

    constructor(connectionName: string, firstUserId: number, secondUserId: number, since?: Date) {
        this.connectionName = connectionName;
        this.firstUserId = firstUserId;
        this.secondUserId = secondUserId;
        if (since) {
            this.since = since;
        }
    }
}
  
  