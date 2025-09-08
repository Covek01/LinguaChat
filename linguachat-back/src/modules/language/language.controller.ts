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
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import {
  Language,
  LanguageInterface,
  LanguageWithLearningLevel,
} from 'src/models/language.types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/authorization/roles.guard';
import { Roles, ROLES_KEY } from '../auth/authorization/roles.decorator';
import { Role } from '../auth/authorization/roles.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('language')
export class LanguageController {
  constructor(private languageService: LanguageService) {}

  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Post('/add')
  async addLanguage(@Query('name') name: string): Promise<Language> {
    return await this.languageService.addLanguage(name).catch((error) => {
      console.log('Error with inserting language');
      console.log(error);

      throw new Error(error);
    });
  }

  @Roles(Role.User, Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('/get/:id')
  async getLanguage(@Param('id') id: string): Promise<LanguageInterface> {
    return await this.languageService
      .getLanguage(parseInt(id, 0))
      .catch((error) => {
        console.log('Error with getting language');
        console.log(error);

        throw new Error(error);
      });
  }

  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  async deleteLanguage(@Param('id') id: string): Promise<string> {
    return await this.languageService
      .deleteLanguage(parseInt(id, 0))
      .catch((error) => {
        console.log('Error with deleting language');
        console.log(error);

        throw new Error(error);
      });
  }

  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Delete('/deleteByName/:name')
  async deleteLanguageByName(@Param('name') name: string): Promise<string> {
    return await this.languageService
      .deleteLanguageByName(name)
      .catch((error) => {
        console.log('Error with deleting language');
        console.log(error);

        throw new Error(error);
      });
  }

  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Put('/update')
  async updateLanguage(@Body() language: LanguageInterface): Promise<string> {
    return await this.languageService
      .updateLanguage(language)
      .catch((error) => {
        console.log('Error with updating language');
        console.log(error);

        throw new Error(error);
      });
  }

  @Roles(Role.User, Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('/getNativeLanguagesForUser/:id')
  async getNativeLanguagesForUser(
    @Param('id') id: string,
  ): Promise<Language[]> {
    try {
      return await this.languageService.getNativeLanguagesForUser(
        parseInt(id, 10),
      );
    } catch (ex) {
      console.log('Error with getting blocked user list');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @Roles(Role.User, Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('/getNativeLanguagesForUserPagination/:id/:limit/:offset')
  async getNativeLanguagesForUserPagination(
    @Param('id') id: string,
    @Param('limit') limit: string,
    @Param('offset') offset: string,
  ): Promise<Language[]> {
    try {
      return await this.languageService.getNativeLanguagesForUserPagination(
        parseInt(id, 10),
        parseInt(limit, 10),
        parseInt(offset, 10),
      );
    } catch (ex) {
      console.log('Error with getting blocked user list');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @Roles(Role.User, Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('/getAllLanguages')
  async getAllLanguages(): Promise<Language[]> {
    try {
      return await this.languageService.getAllLanguages();
    } catch (ex) {
      console.log('Error with getting blocked user list');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @Roles(Role.User, Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('/getNativeLanguagesForMe')
  async getNativeLanguagesForMe(@Request() request): Promise<Language[]> {
    try {
      const myid = request.user.id;
      return await this.languageService.getNativeLanguagesForUser(myid);
    } catch (ex) {
      console.log('Error with getting blocked user list');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @Roles(Role.User, Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('/getLanguagesUserIsLearning/:id')
  async getLanguagesUserIsLearning(
    @Param('id') id: string,
  ): Promise<LanguageWithLearningLevel[]> {
    try {
      return await this.languageService.getLanguagesUserIsLearning(
        parseInt(id, 10),
      );
    } catch (ex) {
      console.log('Error with getting blocked user list');
      console.log(ex);

      throw new Error(ex);
    }
  }

  @Roles(Role.User, Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('/getLanguagesIAmLearning')
  async getLanguagesIAmLearning(
    @Request() request,
  ): Promise<LanguageWithLearningLevel[]> {
    try {
      const myid = request.user.id;
      return await this.languageService.getLanguagesUserIsLearning(myid);
    } catch (ex) {
      console.log('Error with getting blocked user list');
      console.log(ex);

      throw new Error(ex);
    }
  }
}
