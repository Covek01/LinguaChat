import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ConnectionGetDto, CreateConnectionDto } from 'src/models/connection.types';
import { DataSource } from 'typeorm';
import { Connection } from './connection.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ConnectionService {
    constructor(@InjectDataSource('postgresConnection') private dataSource: DataSource) {}

    async getConnection(connectionId: number): Promise<ConnectionGetDto> {
        const connection: Connection = await this.dataSource
            .getRepository(Connection)
            .findOne({
                where: {
                    id: connectionId
                },
                relations: ['firstUser', 'secondUser']
            });

        const connectionDto: ConnectionGetDto = {
            ...connection
        };

        return connectionDto;
    }

    async insertConnection(firstUserId: number, secondUserId: number): Promise<string> {
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
            (userFirst.name < userSecond.name) ? 
                `${userFirst.username}:${userSecond.username}` :
                `${userSecond.username}:${userFirst.username}`

        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Connection)
            .values({
                since: new Date(),
                connectionName: nameOfConnection,
                firstUser: userFirst,
                secondUser: userSecond
            })
            .execute();

        return 'Connection added successfully';
    }

    async deleteConnection(connectionId: number): Promise<string> {
        await this.dataSource
            .createQueryBuilder()
            .delete()
            .from(Connection)
            .where("id = :connectionId", { connectionId })
            .execute();

        return 'Connection deleted successfully';
    }

    async getConnectionsOfUser(userId: number): Promise<ConnectionGetDto[]> {
        const connections: Connection[] | null = await this.dataSource
            .getRepository(Connection)
            .createQueryBuilder('connection')
            .innerJoinAndSelect('connection.firstUser', 'firstUser')
            .innerJoinAndSelect('connection.secondUser', 'secondUser')
            .where('firstUser.id = :userId', {userId})
            .orWhere('secondUser.id = :userId', {userId})
            .getMany();

        if (!connections) {
            throw new Error(`Connections for user with ID ${userId} not found`);
        }
        const connectionsDto: ConnectionGetDto[] = connections.map( conn => {
            return {
                ...conn
            }
        });
        console.log(connectionsDto)
        // const user: User | null = await this.dataSource
        //     .getRepository(User)
        //     .findOne({
        //         where: {
        //             id: userId
        //         }
        //     });

        // const connections: Connection[] | null = await this.dataSource
        //     .getRepository(Connection)
        //     .find({
        //         where:[
        //             {firstUser: user},
        //             {secondUser: user}
        //         ],                
        //         relations: ['firstUser', 'secondUser']
        //     })

        
        // const connectionsDto: ConnectionGetDto[] = connections.map( conn => {
        //     return {
        //         ...conn
        //     }
        // })
        return connectionsDto;
    }
}
