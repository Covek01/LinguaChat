import { Injectable, Post } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PostService {
    constructor(@InjectDataSource('postgresConnection') private dataSource: DataSource){}

    async addPost(
        creatorId: number,
        postText: string,
        postType: string
    ) : Promise<string> {
        const creator: User = await this.dataSource
            .getRepository(User)
            .findOne({
                where:{
                    id: creatorId
                }
            });

        if (!creator) {
            throw new Error(`User with ID ${creatorId} not found`);
        }

        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Post)
            .values({
                type: postType,
                text: postText,
                createdBy: creator
            })
            .execute();

        return 'Post added successfully';
            
             
    }

    async deletePost(postId: number){

    }

    async updatePost(postId: number, text: string, type: string){

    }

    
}
