import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserGetDto, UserInsertDto } from 'src/models/user.types';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Blocking } from './blocking.entity';
import { Language } from '../language/language.entity';
import {
  LanguageInterface,
  LanguageWithLearningLevel,
} from 'src/models/language.types';

@UseGuards(JwtAuthGuard)
@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/get/:id')
  @ApiParam({ name: 'id', type: Number })
  async get(@Param('id') id: string): Promise<UserGetDto> {
    try {
      return await this.userService.get(parseInt(id, 10));
    } catch (ex) {
      console.log('Error with inserting user');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/getForProfile/:id')
  @ApiParam({ name: 'id', type: Number })
  async getForProfile(@Param('id') id: string): Promise<UserGetDto> {
    try {
      return await this.userService.getUserForProfile(parseInt(id, 10));
    } catch (ex) {
      console.log('Error with inserting user');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/myprofile')
  async myProfile(@Request() req): Promise<UserGetDto> {
    try {
      const userId = req.user.id;
      return await this.userService.get(userId);
    } catch (ex) {
      console.log('Error with inserting user');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/getUsersWhoAreBlockedByUser/:id')
  async getUsersWhoAreBlockedByUser(
    @Param('id') id: string,
  ): Promise<UserGetDto[]> {
    try {
      return await this.userService.getUsersWhoAreBlockedByUser(
        parseInt(id, 10),
      );
    } catch (ex) {
      console.log('Error with getting blocked user list');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/getHiddenUsers')
  async getHiddenUsers(
    @Param('id') id: string,
  ): Promise<UserGetDto[]> {
    try {
      return await this.userService.getHiddenUsers(
        parseInt(id, 10),
      );
    } catch (ex) {
      console.log('Error with getting blocked user list');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/getFilteredUsersByLanguage/:userId/:languageId')
  async getFilteredUsersByLanguage(
    @Param('userId') userId: string,
    @Param('languageId') languageId: string,
  ): Promise<UserGetDto[]> {
    try {
      return await this.userService.getFilteredUsersByLanguage(
        parseInt(userId, 10),
        parseInt(languageId, 10),
      );
    } catch (ex) {
      console.log('Error with getting blocked user list');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/getUsersWhoAreBlockedByMe')
  async getUsersWhoAreBlockedByMe(@Request() request): Promise<UserGetDto[]> {
    try {
      const myid = request.user.id;
      return await this.userService.getUsersWhoAreBlockedByUser(myid);
    } catch (ex) {
      console.log('Error with getting blocked user list');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  @ApiParam({ name: 'id', type: Number })
  async delete(@Param() params: any): Promise<number> {
    try {
      return await this.userService.delete(parseInt(params.id, 0));
    } catch (ex) {
      console.log('Error with deleting user');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put('/insertCommentAboutUser')
  @ApiBody({
    schema: {
      properties: {
        id: { type: 'number' },
        comment: { type: 'string' },
      },
    },
  })
  async insertCommentAboutUser(@Body() body: any): Promise<string> {
    try {
      return await this.userService.addCommentAboutUser(
        parseInt(body.id, 0),
        body.comment,
      );
    } catch (ex) {
      console.log('Error with updating user comment');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put('/updateInfo')
  async updateUserInfo(@Body() body: UserGetDto): Promise<UserGetDto> {
    try {
      return await this.userService.updateUserInfo(body);
    } catch (ex) {
      console.log('Error with updating user comment');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/block/:blockerId/:blockedId')
  async blockUser(
    @Param('blockerId') blockerId: string,
    @Param('blockedId') blockedId: string,
  ): Promise<UserGetDto> {
    return await this.userService
      .blockUser(parseInt(blockerId), parseInt(blockedId))
      .catch((error) => {
        console.log('Error with insert blocking');
        console.log(error);

        throw new Error(error);
      });
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/unblock/:blockerId/:blockedId')
  async unblockUser(
    @Param('blockerId') blockerId: string,
    @Param('blockedId') blockedId: string,
  ): Promise<string> {
    return await this.userService
      .unblockUser(parseInt(blockerId, 0), parseInt(blockedId, 0))
      .catch((error) => {
        console.log('Error with delete blocking');
        console.log(error);

        throw new Error(error);
      });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/insertLanguageNative/:userId/:languageId')
  async insertLanguageNative(
    @Param('userId') userId: string,
    @Param('languageId') languageId: string,
  ): Promise<LanguageInterface> {
    return await this.userService
      .insertLanguageNative(parseInt(userId, 0), parseInt(languageId, 0))
      .catch((error) => {
        console.log('Error with adding native language');
        console.log(error);

        throw new Error(error);
      });
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/removeLanguageNative/:userId/:languageId')
  async removeLanguageNative(
    @Param('userId') userId: string,
    @Param('languageId') languageId: string,
  ): Promise<string> {
    return await this.userService
      .removeLanguageNative(parseInt(userId, 0), parseInt(languageId, 0))
      .catch((error) => {
        console.log('Error with adding native language');
        console.log(error);

        throw new Error(error);
      });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/insertLanguageLearning/:userId/:languageId/:level')
  async insertLanguageLearning(
    @Param('userId') userId: string,
    @Param('languageId') languageId: string,
    @Param('level') level: string,
  ): Promise<LanguageWithLearningLevel> {
    return await this.userService
      .insertLanguageLearning(
        parseInt(userId, 0),
        parseInt(languageId, 0),
        level,
      )
      .catch((error) => {
        console.log('Error with adding learning language');
        console.log(error);

        throw new Error(error);
      });
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/removeLanguageLearning/:userId/:languageId')
  async removeLanguageLearning(
    @Param('userId') userId: string,
    @Param('languageId') languageId: string,
  ): Promise<LanguageInterface> {
    return await this.userService
      .removeLanguageLearning(parseInt(userId, 0), parseInt(languageId, 0))
      .catch((error) => {
        console.log('Error with removing learning language');
        console.log(error);

        throw new Error(error);
      });
  }
}
