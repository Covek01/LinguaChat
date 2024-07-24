import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInsertDto } from 'src/models/user.types';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { DeleteResult } from 'typeorm';

@ApiTags("user")
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @HttpCode(HttpStatus.OK)
    @Post('/register')
    @ApiBody({ type: UserInsertDto })
    async register(@Body() user_dto: UserInsertDto) : Promise<void> {
        try{
            return await this.userService.add(user_dto);
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
