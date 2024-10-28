import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, DeleteResult, InsertResult } from 'typeorm';
import { UserGetDto, UserInsertDto, UserInterface } from '../../models/user.types'

import { User } from './user.entity';
import { sha1 } from '../auth/sha1.hash';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '../auth/auth.guard';
import { Blocking } from './blocking.entity';
import { Language } from '../language/language.entity';
import { UserLearningLanguage } from './UserLearningLanguage.entity';

@Injectable()
export class UserService {
    constructor(@InjectDataSource('postgresConnection') private dataSource: DataSource){}

    async get(userId: number) : Promise<UserGetDto> {
        const user: User = await this.dataSource
                    .getRepository(User)
                    .findOne({
                        where: {
                            id: userId
                        }
                    });
                    console.log(user)
        const userDto: UserGetDto = plainToInstance(UserGetDto, user, { excludeExtraneousValues: true });
        console.log(userDto);
        return userDto;
    }

    async getByUsername(username: string) : Promise<User>{
        const user: User = await this.dataSource
                    .getRepository(User)
                    .findOne({
                        where: {
                            username: username
                        }
                    });
        console.log(`Ovde je onaj sto se nece vraca User ${user}`);
        return user;
    }

    async delete(id: number) : Promise<string> {
        const result: DeleteResult = await this.dataSource
            .getRepository(User)
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: id })
            .execute();

        if (result.affected === 0)
            return `User with id ${id} isn't deleted or doesn't exist`;

        return `User with id ${id} is deleted`;
    }

    async addCommentAboutUser(userId: number, user_comment: string) : Promise<string> {
        const result: DeleteResult = await this.dataSource
                .getRepository(User)
                .update({ id: userId }, { comment: user_comment });

        if (result.affected === 0)
            return `User with id ${userId} isn't updated or doesn't exist`;

        return `User with id ${userId} got a new comment`;
    }

    async blockUser(blockerId: number, blockedId: number) : Promise<string> {
        const blocker: User = await this.dataSource
                        .getRepository(User)
                        .findOne({
                            where: {
                                id: blockerId
                            }
                        });

        const blocked: User = await this.dataSource
                        .getRepository(User)
                        .findOne({
                            where: {
                                id: blockedId
                            }
                        });
        const result: InsertResult = await this.dataSource
                        .createQueryBuilder()
                        .insert()
                        .into(Blocking)
                        .values({
                            user: blocker,
                            blockedUser: blocked
                        })
                        .execute();


        return `Blocking added successfully, blocker: ${blocker.id}, blocked: ${blocked.id}`;
    }

    async unblockUser(blockerId: number, blockedId: number) : Promise<string> {
        const result : DeleteResult = await this.dataSource
                            .createQueryBuilder()
                            .delete()
                            .from(Blocking)
                            .where("userId = :blockerId", {blockerId: blockerId})
                            .andWhere("blockedId = :blockedId", {blockedId: blockedId})
                            .execute();
        if (result.affected > 0)
            return `Unblocking added successfully, blocker: ${blockerId}, blocked: ${blockedId}`;
        else 
            return "No rows affected";
    }

    async insertLanguageNative(userId: number, language_id: number) : Promise<string> {        
        await this.dataSource
            .createQueryBuilder()
            .relation(User, 'languagesNative')
            .of(userId)
            .add(language_id)

        return "Native language inserted for user";
    }

    async insertLanguageLearning(
        userId: number,
        language_id: number,
        level: string
        ) : Promise<string> {
        const user: User = await this.dataSource
            .getRepository(User)
            .findOne({
                where:{
                    id: userId
                }
            });
        
        
        const language: Language = await this.dataSource
            .getRepository(Language)
            .findOne({
                where:{
                    id: language_id
                }
            });
        
        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(UserLearningLanguage)
            .values({
                user: user,
                language: language,
                level: level
            })
            .orUpdate(['level'], ['language_id', 'user_id'])
            .execute();
        
        const languageLearning = await this.dataSource
            .getRepository(UserLearningLanguage)
            .createQueryBuilder('UserLearningLanguage')
            .where('UserLearningLanguage.language_id = :languageId', {languageId: language_id})
            .getCount();
                
        language.popularity = languageLearning;
        await this.dataSource
            .manager
            .save(language);
        
        return "Learning language inserted for user";
    }

    async removeLanguageLearning(
        userId: number,
        language_id: number,
        ) : Promise<string> {      
        const language: Language = await this.dataSource
            .getRepository(Language)
            .findOne({
                where:{
                    id: language_id
                }
            });
        
        await this.dataSource
            .createQueryBuilder()
            .delete()
            .from(UserLearningLanguage)
            .where('userId = :userId', {userId: userId})
            .andWhere('language_id = :languageId', {languageId: language_id})
            .execute();
        
        const languageLearning = await this.dataSource
            .getRepository(UserLearningLanguage)
            .createQueryBuilder('UserLearningLanguage')
            .where('UserLearningLanguage.language_id = :languageId', {languageId: language_id})
            .getCount();
                
        language.popularity = languageLearning;
        await this.dataSource
            .manager
            .save(language);
        
        return "Learning language removed for user";
    }
}
