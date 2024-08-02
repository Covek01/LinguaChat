import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, DeleteResult, InsertResult } from 'typeorm';
import { Language } from './language.entity';
import { LanguageInterface, NullLanguage } from 'src/models/language.types';

@Injectable()
export class LanguageService {
    constructor(@InjectDataSource('postgresConnection') private dataSource: DataSource){}

    async addLanguage(name: string) : Promise<string> {
        const result : InsertResult = await this.dataSource
                            .getRepository(Language)
                            .insert({
                                name: name,
                                popularity: 0
                            });

        return "Language successfully added";
    }

    async getLanguage(languageId: number) : Promise<LanguageInterface> {
        const result : Language = await this.dataSource
                            .getRepository(Language)
                            .findOne({
                                where: {
                                    id: languageId
                                }
                            });
        
        const language : LanguageInterface = {...result};
        return language;
    }

    async deleteLanguage(id: number) : Promise<string> {
        const result : DeleteResult = await this.dataSource
                            .createQueryBuilder()
                            .delete()
                            .where('id = :id', {id: id})
                            .execute();

        return "Language successfully deleted";
    }

    async deleteLanguageByName(languageName: string) : Promise<string> {
        const result : DeleteResult = await this.dataSource
                            .createQueryBuilder()
                            .delete()
                            .where('name = :name', {name: languageName})
                            .execute();

        return "Language successfully deleted";
    }

    async updateLanguage(language: LanguageInterface) : Promise<string> {
        const result : DeleteResult = await this.dataSource
                            .getRepository(Language)
                            .update(language.id, {
                                name: language.name, 
                            });
        return "Language successfully deleted";
    }
}
