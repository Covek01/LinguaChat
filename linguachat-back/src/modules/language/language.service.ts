import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, DeleteResult, InsertResult } from 'typeorm';
import { Language } from './language.entity';
import {
  LanguageInterface,
  LanguageWithLearningLevel,
} from 'src/models/language.types';
import { UserLearningLanguage } from '../user/UserLearningLanguage.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectDataSource('postgresConnection') private dataSource: DataSource,
  ) {}

  async addLanguage(name: string): Promise<Language> {
    // const result: InsertResult = await this.dataSource
    //   .getRepository(Language)
    //   .insert({
    //     name: name,
    //     popularity: 0,
    //   });
    const languageToInsert: Language = await this.dataSource
      .getRepository(Language)
      .create({
        name: name,
        popularity: 0,
      });

    return this.dataSource.getRepository(Language).save(languageToInsert);
  }

  async getLanguage(languageId: number): Promise<LanguageInterface> {
    const result: Language = await this.dataSource
      .getRepository(Language)
      .findOne({
        where: {
          id: languageId,
        },
      });

    const language: LanguageInterface = { ...result };
    return language;
  }

  async deleteLanguage(id: number): Promise<string> {
    const resultNativeLanguages: DeleteResult = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from('users_native_languages')
      .where('language_id = :id', { id })
      .execute();

    const result: DeleteResult = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Language)
      .where('id = :id', { id: id })
      .execute();

    return 'Language successfully deleted';
  }

  async deleteLanguageByName(languageName: string): Promise<string> {
    const result: DeleteResult = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Language)
      .where('name = :name', { name: languageName })
      .execute();

    return 'Language successfully deleted';
  }

  async updateLanguage(language: LanguageInterface): Promise<string> {
    const result: DeleteResult = await this.dataSource
      .getRepository(Language)
      .update(language.id, {
        name: language.name,
      });
    return 'Language successfully deleted';
  }

  async getLanguagesUserIsLearning(
    userId: number,
  ): Promise<LanguageWithLearningLevel[]> {
    const userLearningLanguages: UserLearningLanguage[] = await this.dataSource
      .getRepository(UserLearningLanguage)
      .createQueryBuilder('userLearningLanguage')
      .leftJoinAndSelect('userLearningLanguage.language', 'language')
      .where('userLearningLanguage.user_id = :userId', { userId })
      .getMany();

    const learnedLanguages: LanguageWithLearningLevel[] =
      userLearningLanguages.map((userLearningLanguage) => {
        return {
          ...userLearningLanguage.language,
          level: userLearningLanguage.level,
        };
      });
    return learnedLanguages;
  }

  async getAllLanguages(): Promise<Language[]> {
    const allLanguages: Language[] = await this.dataSource
      .getRepository(Language)
      .createQueryBuilder('language')
      .getMany();

    return allLanguages;
  }

  async getNativeLanguagesForUser(userId: number): Promise<Language[]> {
    const languages: Language[] = await this.dataSource
      .getRepository(Language)
      .createQueryBuilder('language')
      .innerJoin('language.nativeBy', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    console.log(languages);
    return languages;
  }

  async getNativeLanguagesForUserPagination(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<Language[]> {
    const languages: Language[] = await this.dataSource
      .getRepository(Language)
      .createQueryBuilder('language')
      .innerJoin('language.nativeBy', 'user')
      .where('user.id = :userId', { userId })
      .limit(limit)
      .offset(offset)
      .getMany();

    console.log(languages);
    return languages;
  }
}
