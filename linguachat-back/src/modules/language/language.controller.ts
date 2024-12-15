import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { LanguageService } from './language.service';
import { AuthGuard } from '../auth/auth.guard';
import { Language, LanguageInterface, NullLanguage } from 'src/models/language.types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('language')
export class LanguageController {
    constructor(private languageService: LanguageService){}

    @HttpCode(HttpStatus.OK)
    @Post('/add')
    async addLanguage(@Query('name') name: string) : Promise<string> {
        return await this.languageService.addLanguage(name)
                    .catch( error => {
                        console.log("Error with inserting language");
                        console.log(error);

                        throw new Error(error);
                    });
    }

    @HttpCode(HttpStatus.OK)
    @Get('/get/:id')
    async getLanguage(@Param('id') id: string) : Promise<LanguageInterface> {
        return await this.languageService.getLanguage(parseInt(id, 0))
                    .catch( error => {
                        console.log("Error with getting language");
                        console.log(error);

                        throw new Error(error);
                    });
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:id')
    async deleteLanguage(@Param('id') id: string) : Promise<string> {
        return await this.languageService.deleteLanguage(parseInt(id, 0))
                    .catch( error => {
                        console.log("Error with deleting language");
                        console.log(error);

                        throw new Error(error);
                    });
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/deleteByName/:name')
    async deleteLanguageByName(@Param('name') name: string) : Promise<string> {
        return await this.languageService.deleteLanguageByName(name)
                    .catch( error => {
                        console.log("Error with deleting language");
                        console.log(error);

                        throw new Error(error);
                    });
    }
    @HttpCode(HttpStatus.OK)
    @Put('/update')
    async updateLanguage(@Body() language: LanguageInterface) : Promise<string> {
        return await this.languageService.updateLanguage(language)
                    .catch( error => {
                        console.log("Error with updating language");
                        console.log(error);

                        throw new Error(error);    
                    });
    }

    @HttpCode(HttpStatus.OK)
    @Get('/getNativeLanguagesForUser/:id')
    async getNativeLanguagesForUser(@Param('id') id: string) : Promise<Language[]> {
        try{
            return await this.languageService.getNativeLanguagesForUser(parseInt(id, 10));
        } catch(ex){
            console.log("Error with getting blocked user list");
            console.log(ex);

            throw new Error(ex);
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get('/getLanguagesUserIsLearning/:id')
    async getLanguagesUserIsLearning(@Param('id') id: string) : Promise<Language[]> {
        try{
            return await this.languageService.getLanguagesUserIsLearning(parseInt(id, 10));
        } catch(ex){
            console.log("Error with getting blocked user list");
            console.log(ex);

            throw new Error(ex);
        }
    }
}
