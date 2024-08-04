import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { DataSource } from 'typeorm';
import { Language } from '../language/language.entity';
import { NullPost, PostGetDto } from 'src/models/post.types';
import { Post } from 'src/modules/post/post.entity'
import { plainToClass, plainToInstance } from 'class-transformer';
@Injectable()
export class PostService {
    constructor(@InjectDataSource('postgresConnection') private dataSource: DataSource){}

    async addPost(
        creatorId: number,
        postText: string,
        postType: string,
        languageId: number
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

        const language: Language = await this.dataSource
            .getRepository(Language)
            .findOne({
                where:{
                    id: languageId
                }
            });

        if (!creator) {
            throw new Error(`Language with ID ${creatorId} not found`);
        }

        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Post)
            .values({
                type: postType,
                text: postText,
                createdBy: creator,
                language: language
            })
            .execute();

        return 'Post added successfully';
            
             
    }

    async getPost(postId: number): Promise<PostGetDto> {
        const post: Post =  await this.dataSource 
            .getRepository(Post)
            .findOne({
                where: {
                    id: postId
                },
                relations: {
                    language: true,
                    createdBy: true
                }
            });
        
        if (!post)
            throw new Error("Post with this ID doesn't exist")

        const postGetDto: PostGetDto = { ...post,
            createdBy: post.createdBy, 
            language: post.language
        };

        return postGetDto;
    }

    async deletePost(postId: number): Promise<string> {
        await this.dataSource
            .createQueryBuilder()
            .delete()
            .from(Post)
            .where("id = :postId", { postId })
            .execute();

        return 'Post deleted succesfully';
    }

    async updatePost(postId: number, text: string, type: string, languageId: number) : Promise<PostGetDto>{
        const language: Language | null = await this.dataSource
            .getRepository(Language)
            .findOne({
                where: {
                    id: languageId
                }
            });

        if (!language)
            console.log("Language doesn't exist");

        await this.dataSource
        .createQueryBuilder()
        .update(Post)
        .set({
            text: text,
            type: type,
            language: language
        })
        .where("id = :postId", { postId })
        .execute();

        const updatedPost: Post | null = await this.dataSource
        .getRepository(Post)
        .findOne({
            where: { id: postId },
            relations: ['createdBy', 'language'], // Include related entities if needed
        });

        if (!updatedPost)
            console.log("Updated post doesn't exist");

        const postGetDto: PostGetDto = { ...updatedPost,
            createdBy: updatedPost.createdBy, 
            language: updatedPost.language
        };

        return postGetDto;
    }

    async getPostsOfUser(userId: number): Promise<PostGetDto[]> {
        const posts: Post[] | null = await this.dataSource
            .getRepository(Post)
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.createdBy', 'createdBy')
            .innerJoinAndSelect('post.language', 'language')
            .where('createdBy.id = :userId', {userId})
            .getMany();

        if (!posts){
            throw new Error("Posts for this user don't exist");
        }

        const postsDto: PostGetDto[] = posts.map(post => {
            return {
                id: post.id,
                text: post.text,
                type: post.type,
                createdBy: post.createdBy,
                language: post.language
            };
        });

        return postsDto;
    }
}
