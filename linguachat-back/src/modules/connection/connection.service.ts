import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  ConnectionGetDto,
  ConnectionWithoutId,
} from 'src/models/connection.types';
import { DataSource, DeleteResult } from 'typeorm';
import { Connection } from './connection.entity';
import { User } from '../user/user.entity';
import { UserGetDto } from 'src/models/user.types';
import { DoubleIds } from 'src/models/models.type';
import { removePassHash } from 'src/utils/user.utils';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectDataSource('postgresConnection') private dataSource: DataSource,
  ) {}

  async getConnection(connectionId: number): Promise<ConnectionGetDto> {
    const connection: Connection = await this.dataSource
      .getRepository(Connection)
      .findOne({
        where: {
          id: connectionId,
        },
        relations: ['firstUser', 'secondUser'],
      });

    const connectionDto: ConnectionGetDto = {
      ...connection,
    };

    return connectionDto;
  }

  async insertConnection(
    firstUserId: number,
    secondUserId: number,
  ): Promise<ConnectionWithoutId> {
    const userFirst: User | null = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id: firstUserId } });

    if (!userFirst) {
      throw new Error(`User with ID ${firstUserId} not found`);
    }

    const userSecond: User | null = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id: secondUserId } });

    if (!userSecond) {
      throw new Error(`User with ID ${secondUserId} not found`);
    }

    const nameOfConnection: string =
      userFirst.username < userSecond.username
        ? `${userFirst.username}:${userSecond.username}`
        : `${userSecond.username}:${userFirst.username}`;

    const insertObject: ConnectionWithoutId = {
      since: new Date(),
      connectionName: nameOfConnection,
      firstUser: removePassHash(userFirst),
      secondUser: removePassHash(userSecond),
    };
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Connection)
      .values(insertObject)
      .execute();

    return insertObject;
  }

  async deleteConnection(connectionId: number): Promise<number> {
    const result: DeleteResult = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Connection)
      .where('id = :connectionId', { connectionId })
      .execute();

    if (result.affected === 0)
      throw new Error(
        `User with id ${connectionId} isn't deleted or doesn't exist`,
      );

    return connectionId;
  }

  async deleteConnectionBetweenUsers(
    firstId: number,
    secondId: number,
  ): Promise<DoubleIds> {
    const result: DeleteResult = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Connection)
      .where(
        '(first_id = :firstId AND second_id = :secondId) OR (first_id = :secondId AND second_id = :firstId)',
        { firstId, secondId },
      )
      .execute();

    if (result.affected === 0)
      throw new Error(
        `Connection with users ${firstId} and ${secondId} doesn't exist`,
      );

    const pairIds = {
      firstId: firstId,
      secondId: secondId,
    };

    return pairIds;
  }

  async getConnectionsOfUser(userId: number): Promise<ConnectionGetDto[]> {
    const connections: Connection[] | null = await this.dataSource
      .getRepository(Connection)
      .createQueryBuilder('connection')
      .innerJoinAndSelect('connection.firstUser', 'firstUser')
      .innerJoinAndSelect('connection.secondUser', 'secondUser')
      .where('firstUser.id = :userId', { userId })
      .orWhere('secondUser.id = :userId', { userId })
      .getMany();

    console.log('CONNECTIONS ' + connections.toString());

    if (!connections) {
      throw new Error(`Connections for user with ID ${userId} not found`);
    }
    const connectionsDto: ConnectionGetDto[] = connections.map((conn) => {
      return {
        ...conn,
      };
    });

    return connections;
  }

  async getConnectedUsersOfUser(userId: number): Promise<UserGetDto[]> {
    const connections: Connection[] | null = await this.dataSource
      .getRepository(Connection)
      .createQueryBuilder('connection')
      .innerJoinAndSelect('connection.firstUser', 'firstUser')
      .innerJoinAndSelect('connection.secondUser', 'secondUser')
      .where('firstUser.id = :userId OR secondUser.id = :userId', { userId })
      .getMany();

    const connectedUsersOfUser = connections.map((conn) => {
      const userWithPassword =
        conn.firstUser.id === userId ? conn.secondUser : conn.firstUser;
      const { passHash, ...userWithoutPassword } = userWithPassword;

      return userWithoutPassword;
    });

    if (!connections) {
      throw new Error(`Connections for user with ID ${userId} not found`);
    }

    console.log(connections);

    return connectedUsersOfUser;
  }
}
