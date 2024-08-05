import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { AuthGuard } from '../auth/auth.guard';
import { ConnectionGetDto, CreateConnectionDto } from 'src/models/connection.types';

@Controller('connection')
export class ConnectionController {
    constructor(private connectionService: ConnectionService){}
    
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/add/:firstUserId/:secondUserId')
    async addConnection(
        @Param('firstUserId') firstUserId: string,
        @Param('secondUserId') secondUserId: string
    ): Promise<string> {
        return await this.connectionService.insertConnection(
            parseInt(firstUserId, 0),
            parseInt(secondUserId, 0)
        ).catch(error => {
            console.log("Error with inserting connection");
            console.log(error);

            throw new Error(error); 
        });
    }

    @UseGuards(AuthGuard)
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

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:id')
    async deleteComment(@Param('id') id: string): Promise<string> {
        return await this.connectionService.deleteConnection(
            parseInt(id, 0)
        ).catch(error => {
            console.log("Error with deleting connection");
            console.log(error);

            throw new Error(error);
        });
    }

    @UseGuards(AuthGuard)
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
}

