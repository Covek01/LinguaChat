import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, DeleteResult } from 'typeorm';
import { UserGetDto, UserInsertDto, UserInterface } from '../../models/user.types'

import { User } from './user.entity';
import { sha1 } from '../auth/sha1.hash';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '../auth/auth.guard';

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

    async addComment(user_id: number, user_comment: string) : Promise<string> {
        const result: DeleteResult = await this.dataSource
                .getRepository(User)
                .update({ id: user_id }, { comment: user_comment });

        if (result.affected === 0)
            return `User with id ${user_id} isn't updated or doesn't exist`;

        return `User with id ${user_id} got a new comment`;
    }
}
