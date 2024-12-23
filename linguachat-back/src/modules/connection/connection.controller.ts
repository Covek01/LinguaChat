import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Request } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { AuthGuard } from '../auth/auth.guard';
import { ConnectionGetDto, ConnectionWithoutId, CreateConnectionDto } from 'src/models/connection.types';
import { UserGetDto } from 'src/models/user.types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DoubleIds } from 'src/models/models.type';
import { Connection } from './connection.entity';

@UseGuards(JwtAuthGuard)
@Controller('connection')
export class ConnectionController {
    constructor(private connectionService: ConnectionService){}
    
    @HttpCode(HttpStatus.OK)
    @Post('/add/:firstUserId/:secondUserId')
    async addConnection(
        @Param('firstUserId') firstUserId: string,
        @Param('secondUserId') secondUserId: string
    ): Promise<ConnectionWithoutId> {
        return await this.connectionService.insertConnection(
            parseInt(firstUserId, 0),
            parseInt(secondUserId, 0)
        ).catch(error => {
            console.log("Error with inserting connection");
            console.log(error);

            throw new Error(error); 
        });
    }

    @HttpCode(HttpStatus.OK)
    @Get('/get/:id')
    async getConnection(@Param('id') id: string): Promise<ConnectionGetDto> {
        return await this.connectionService.getConnection(
            parseInt(id, 0)
        ).catch(error => {
            console.log("Error with getting connection");
            console.log(error);

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:id')
    async deleteConnection(@Param('id') id: string): Promise<number> {
        return await this.connectionService.deleteConnection(
            parseInt(id, 0)
        ).catch(error => {
            console.log("Error with deleting connection");
            console.log(error);

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:firstId/:secondId')
    async deleteConnectionBetwenUsers(
        @Param('firstId') firstId: string,
        @Param('secondId') secondId: string                
    ): Promise<DoubleIds> {
        return await this.connectionService.deleteConnectionBetweenUsers(
            parseInt(firstId, 0),
            parseInt(secondId, 0)
        ).catch(error => {
            console.log("Error with deleting connection");
            console.log(error);

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Get('/getConnectionsOfUser/:id')
    async getConnectionsOfUser(@Param('id') id: string): Promise<ConnectionGetDto[]> {
        return await this.connectionService.getConnectionsOfUser(
            parseInt(id, 0)
        ).catch(error => {
            console.log("Error with getting connections of User");
            console.log(error);

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Get('/getConnectedUsersOfMe')
    async getConnectionsOfMe(@Request() req): Promise<UserGetDto[]> {
        const myid = req.user.id;
        return await this.connectionService.getConnectedUsersOfUser(
            myid
        ).catch(error => {
            console.log("Error with getting connections of User");
            console.log(error);

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Get('/getConnectedUsersOfUser/:id')
    async getConnectedUsersOfUser(@Param('id') id: string): Promise<UserGetDto[]> {
        try {
            return await this.connectionService.getConnectedUsersOfUser(
                parseInt(id, 10)
            );
        } catch(ex){
            console.log("Error with getting connections of user");
            console.log(ex);

            throw new Error(ex);
        };
    }
}

