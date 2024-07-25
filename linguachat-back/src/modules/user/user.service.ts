import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, DeleteResult } from 'typeorm';
import { UserGetDto, UserInsertDto, UserInterface } from '../../models/user.types'

import { User } from './user.entity';
import { sha1 } from '../auth/sha1.hash';
import { plainToInstance } from 'class-transformer';

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

    async getByUsername(username: string) : Promise<UserInterface>{
        const user: UserInterface = await this.dataSource
                    .getRepository(User)
                    .findOne({
                        where: {
                            username: username
                        }
                    });
        
        return user;
    }

    async add(user_dto: UserInsertDto) : Promise<void> {
        const user = {
            name: user_dto.name,
            surname: user_dto.surname,
            username: user_dto.username,
            email: user_dto.email, 
            passHash: sha1(user_dto.password),
            since: new Date(),
            born: user_dto.born,
            comment: '',
            country: user_dto.country,
            city: user_dto.city,
            role: "User"
        }
            const result = await this.dataSource
            .getRepository(User)
            .insert(user);

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
