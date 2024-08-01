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


    @UseGuards(AuthGuard)
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

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Put('/insertCommentAboutUser')
    @ApiBody({
        schema: {
            properties: {
                id: {type: 'number'},
                comment: {type: 'string'}
            }
        }
    })
    async insertCommentAboutUser(@Body() body: any) : Promise<string> {
        try{
            return await this.userService.addCommentAboutUser(parseInt(body.id, 0), body.comment);
        } catch(ex){
            console.log("Error with updating user comment");
            console.log(ex);
        }
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/block/:blockerId/:blockedId')
    async blockUser(@Param('blockerId') blockerId: string, @Param('blockedId') blockedId: string) : Promise<string> {
            return await this.userService.blockUser(parseInt(blockerId, 0), parseInt(blockedId, 0))
                        .catch( error => {
                            console.log("Error with insert blocking");
                            console.log(error);

                            return "Error with insert blocking"
                        });
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('/unblock/:blockerId/:blockedId')
    async unblockUser(@Param('blockerId') blockerId: string, @Param('blockedId') blockedId: string) : Promise<string> {
        return await this.userService.unblockUser(parseInt(blockerId, 0), parseInt(blockedId, 0))
                    .catch( error => {
                        console.log("Error with delete blocking");
                        console.log(error);

                        return "Error with delete blocking"
                    });
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/insertLanguageNative/:userId/:languageId')
    async insertLanguageNative(@Param('userId') user_id: string, @Param('languageId') language_id: string) : Promise<string> {
        return await this.userService.insertLanguageNative(parseInt(user_id, 0), parseInt(language_id, 0))
                    .catch( error => {
                        console.log("Error with adding native language");
                        console.log(error);

                        return "Error with adding native language"
                    });
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/insertLanguageLearning/:userId/:languageId/:level')
    async insertLanguageLearning(
        @Param('userId') user_id: string,
        @Param('languageId') language_id: string,
        @Param('level') level: string
        ) : Promise<string> {
        return await this.userService.insertLanguageLearning(parseInt(user_id, 0), parseInt(language_id, 0), level)
                    .catch( error => {
                        console.log("Error with adding native language");
                        console.log(error);

                        return "Error with adding native language"
                    });
    }
}
