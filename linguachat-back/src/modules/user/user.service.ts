import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserGetDto, UserInsertDto, UserInterface } from '../../../../models/models.type'

import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectDataSource('postgresConnection') private dataSource: DataSource){}

    async get(user_id: number) : Promise<UserGetDto> {
        const user: UserGetDto = await this.dataSource
                    .getRepository(User)
                    .findOne({
                        where: {
                            id: user_id
                        }
                    });
        
        return user;
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

    // async add(user_dto: UserInsertDto) : Promise<void> {
    //     const user: User = {
    //         name: user_dto.name,
    //         surname: user_dto.surname,
    //         username: user_dto.username,
    //         email: user_dto.email, 
    //         passHash: ,
    //         born: Date,
    //         country: string,
    //         city: string,
    //     }
    //     await this.dataSource
    //                 .getRepository()
    //                 .insert(user_dto)
    // }
}
