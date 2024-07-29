import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserGetDto, UserInsertDto } from 'src/models/user.types';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';


@ApiTags("user")
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}


    
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('/get/:id')
    @ApiParam(
        {name: 'id', type: Number}
    )
    async get(@Param('id') id: string) : Promise<UserGetDto> {
        try{
            return await this.userService.get(parseInt(id, 0));
        } catch(ex){
            console.log("Error with inserting user");
            console.log(ex);
        }
    }


    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:id')
    @ApiParam({name: 'id', type: Number})
    async delete(@Param() params: any) : Promise<string> {
        try{
            return await this.userService.delete(parseInt(params.id, 0));
        } catch(ex){
            console.log("Error with deleting user");
            console.log(ex);
        }
    }

    @HttpCode(HttpStatus.OK)
    @Put('/update')
    @ApiBody({
        schema: {
            properties: {
                id: {type: 'number'},
                comment: {type: 'string'}
            }
        }
    })
    async insertComment(@Body() body: any) : Promise<string> {
        try{
            return await this.userService.addComment(parseInt(body.id, 0), body.comment);
        } catch(ex){
            console.log("Error with updating user comment");
            console.log(ex);
        }
    }
}
