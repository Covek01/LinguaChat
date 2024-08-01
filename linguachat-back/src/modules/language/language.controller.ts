import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { LanguageService } from './language.service';
import { AuthGuard } from '../auth/auth.guard';
import { LanguageInterface, NullLanguage } from 'src/models/language.types';

@Controller('language')
export class LanguageController {
    constructor(private languageService: LanguageService){}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/add')
    async addLanguage(@Query('name') name: string) : Promise<string> {
        return await this.languageService.addLanguage(name)
                    .catch( error => {
                        console.log("Error with inserting language");
                        console.log(error);

                        return "Error with inserting language"
                    });
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('/get/:id')
    async getLanguage(@Param('id') id: string) : Promise<LanguageInterface> {
        return await this.languageService.getLanguage(parseInt(id, 0))
                    .catch( error => {
                        console.log("Error with getting language");
                        console.log(error);

                        return NullLanguage;
                    });
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:id')
    async deleteLanguage(@Param('id') id: string) : Promise<string> {
        return await this.languageService.deleteLanguage(parseInt(id, 0))
                    .catch( error => {
                        console.log("Error with deleting language");
                        console.log(error);

                        return "Error with deleting language"
                    });
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('/deleteByName/:name')
    async deleteLanguageByName(@Param('name') name: string) : Promise<string> {
        return await this.languageService.deleteLanguageByName(name)
                    .catch( error => {
                        console.log("Error with deleting language");
                        console.log(error);

                        return "Error with deleting language"
                    });
    }
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Put('/update')
    async updateLanguage(@Body() language: LanguageInterface) : Promise<string> {
        return await this.languageService.updateLanguage(language)
                    .catch( error => {
                        console.log("Error with updating language");
                        console.log(error);

                        return "Error with updating language"
                    });
    }
}
