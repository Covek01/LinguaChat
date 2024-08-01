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

    async get(user_id: number) : Promise<UserGetDto> {
        const user: User = await this.dataSource
                    .getRepository(User)
                    .findOne({
                        where: {
                            id: user_id
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

    async addCommentAboutUser(user_id: number, user_comment: string) : Promise<string> {
        const result: DeleteResult = await this.dataSource
                .getRepository(User)
                .update({ id: user_id }, { comment: user_comment });

        if (result.affected === 0)
            return `User with id ${user_id} isn't updated or doesn't exist`;

        return `User with id ${user_id} got a new comment`;
    }

    async blockUser(blocker_id: number, blocked_id: number) : Promise<string> {
        const blocker: User = await this.dataSource
                        .getRepository(User)
                        .findOne({
                            where: {
                                id: blocker_id
                            }
                        });

        const blocked: User = await this.dataSource
                        .getRepository(User)
                        .findOne({
                            where: {
                                id: blocked_id
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

    async unblockUser(blocker_id: number, blocked_id: number) : Promise<string> {
        const result : DeleteResult = await this.dataSource
                            .createQueryBuilder()
                            .delete()
                            .from(Blocking)
                            .where("userId = :blockerId", {blockerId: blocker_id})
                            .andWhere("blockedId = :blockedId", {blockedId: blocked_id})
                            .execute();
        if (result.affected > 0)
            return `Unblocking added successfully, blocker: ${blocker_id}, blocked: ${blocked_id}`;
        else 
            return "No rows affected";
    }

    async insertLanguageNative(user_id: number, language_id: number) : Promise<string> {
        // const user : User = await this.dataSource
        // .manager
        // .findOne(User, {
        //     where: {
        //         id: user_id
        //     }
        // });
        // const language : Language = await this.dataSource
        // .manager
        // .findOne(Language, {
        //     where: {
        //         id: language_id
        //     }
        // });
        // console.log(user)
        // console.log(language)
        // user.languagesNative.push(language);
        // await this.dataSource.manager.save(user);

        
        await this.dataSource
            .createQueryBuilder()
            .relation(User, 'languagesNative')
            .of(user_id)
            .add(language_id)

        return "Native language inserted for user";
    }

    async insertLanguageLearning(
        user_id: number,
        language_id: number,
        level: string
        ) : Promise<string> {
        // const user : User = await this.dataSource
        // .manager
        // .findOne(User, {
        //     where: {
        //         id: user_id
        //     }
        // });
        // const language : Language = await this.dataSource
        // .manager
        // .findOne(Language, {
        //     where: {
        //         id: language_id
        //     }
        // });

        // user.languagesNative.push(language);
        // language.learnedBy.push(user);
        // language.popularity++;

        // await this.dataSource.manager.transaction(async (manager) => {
        //     await manager.save(user);
        //     await manager.save(language);
        // })

        const user: User = await this.dataSource
            .getRepository(User)
            .findOne({
                where:{
                    id: user_id
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
}
