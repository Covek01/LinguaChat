import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { DataSource } from 'typeorm';
import { Language } from '../language/language.entity';
import {
  NullPost,
  PostGetDto,
  PostWithLikedAndCount,
} from 'src/models/post.types';
import { Post } from 'src/modules/post/post.entity';
import { plainToClass, plainToInstance } from 'class-transformer';
import { removePassHash } from 'src/utils/user.utils';
import { title } from 'process';
import { ReturnMessage } from 'src/models/models.type';
@Injectable()
export class PostService {
  constructor(
    @InjectDataSource('postgresConnection') private dataSource: DataSource,
  ) {}

  async addPost(
    creatorId: number,
    postText: string,
    postType: string,
    languageId: number,
  ): Promise<string> {
    const creator: User = await this.dataSource.getRepository(User).findOne({
      where: {
        id: creatorId,
      },
    });

    if (!creator) {
      throw new Error(`User with ID ${creatorId} not found`);
    }

    const language: Language = await this.dataSource
      .getRepository(Language)
      .findOne({
        where: {
          id: languageId,
        },
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
        language: language,
      })
      .execute();

    return 'Post added successfully';
  }

  async addPostAndReturnResult(
    creatorId: number,
    postTitle: string,
    postText: string,
    postType: string,
    languageId: number,
  ): Promise<Post> {
    const creator: User = await this.dataSource.getRepository(User).findOne({
      where: {
        id: creatorId,
      },
    });

    if (!creator) {
      throw new Error(`User with ID ${creatorId} not found`);
    }

    const language: Language = await this.dataSource
      .getRepository(Language)
      .findOne({
        where: {
          id: languageId,
        },
      });

    if (!creator) {
      throw new Error(`Language with ID ${creatorId} not found`);
    }

    // const result = await this.dataSource
    //     .createQueryBuilder()
    //     .insert()
    //     .into(Post)
    //     .values({
    //         type: postType,
    //         text: postText,
    //         createdBy: creator,
    //         language: language
    //     })
    //     .returning('*')
    //     .execute();

    const insertedObject = {
      type: postType,
      title: postTitle,
      text: postText,
      time: new Date(),
      createdBy: creator,
      language: language,
    };

    const result = await this.dataSource
      .getRepository(Post)
      .save(insertedObject);

    result.createdBy.passHash = '';

    return result;
  }

  async getPost(postId: number): Promise<PostGetDto> {
    const post: Post = await this.dataSource.getRepository(Post).findOne({
      where: {
        id: postId,
      },
      relations: {
        language: true,
        createdBy: true,
      },
    });

    if (!post) throw new Error("Post with this ID doesn't exist");

    const postGetDto: PostGetDto = {
      ...post,
      createdBy: post.createdBy,
      language: post.language,
    };

    return postGetDto;
  }

  async deletePost(postId: number): Promise<ReturnMessage> {
    console.log("TAKNUT SAM")
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where('id = :postId', { postId })
      .execute();

    return new ReturnMessage('Post deleted succesfully');
  }

  async updatePost(
    postId: number,
    text: string,
    type: string,
    languageId: number,
  ): Promise<PostGetDto> {
    const language: Language | null = await this.dataSource
      .getRepository(Language)
      .findOne({
        where: {
          id: languageId,
        },
      });

    if (!language) console.log("Language doesn't exist");

    await this.dataSource
      .createQueryBuilder()
      .update(Post)
      .set({
        text: text,
        type: type,
        language: language,
      })
      .where('id = :postId', { postId })
      .execute();

    const updatedPost: Post | null = await this.dataSource
      .getRepository(Post)
      .findOne({
        where: { id: postId },
        relations: ['createdBy', 'language'], // Include related entities if needed
      });

    if (!updatedPost) console.log("Updated post doesn't exist");

    const postGetDto: PostGetDto = {
      ...updatedPost,
      createdBy: updatedPost.createdBy,
      language: updatedPost.language,
    };

    return postGetDto;
  }

  async likePost(userId: number, postId: number): Promise<string> {
    console.log(userId);
    console.log(postId);
    await this.dataSource
      .createQueryBuilder()
      .relation(Post, 'likedByUsers')
      .of(postId)
      .add(userId);

    return 'Post liked successfully';
  }

  async unlikePost(userId: number, postId: number): Promise<string> {
    console.log(userId);
    console.log(postId);
    await this.dataSource
      .createQueryBuilder()
      .relation(Post, 'likedByUsers')
      .of(postId)
      .remove(userId);

    return 'Post unliked successfully';
  }

  async getPostsOfUser(userId: number): Promise<PostGetDto[]> {
    const posts: Post[] | null = await this.dataSource
      .getRepository(Post)
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.createdBy', 'createdBy')
      .innerJoinAndSelect('post.language', 'language')
      .where('createdBy.id = :userId', { userId })
      .getMany();

    if (!posts) {
      throw new Error("Posts for this user don't exist");
    }

    const postsDto: PostGetDto[] = posts.map((post) => {
      return {
        id: post.id,
        title: post.title,
        text: post.text,
        type: post.type,
        time: post.time,
        createdBy: post.createdBy,
        language: post.language,
      };
    });

    return postsDto;
  }

  async getPostsOfUserWithLikedStatus(
    myId: number,
    userId: number,
  ): Promise<PostWithLikedAndCount[]> {
    const posts: Post[] | null = await this.dataSource
      .getRepository(Post)
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.createdBy', 'createdBy')
      .innerJoinAndSelect('post.language', 'language')
      .leftJoinAndSelect('post.likedByUsers', 'likedByUsers')
      .where('createdBy.id = :userId', { userId })
      .select(['post', 'createdBy', 'language', 'likedByUsers.id'])
      .getMany();

    console.log(posts);

    if (!posts) {
      throw new Error("Posts for this user don't exist");
    }

    const postsWithLiked = posts.map((post) => {
      const isLiked = post.likedByUsers
        .map((liked) => liked.id)
        .some((currentId) => currentId === myId);
      const likedCount = post.likedByUsers.length;
      return {
        ...post,
        liked: isLiked,
        likedCount: likedCount,
      };
    });

    // const postsReturn: Post[] | null = posts.map((post) => {
    //   post.createdBy.passHash = '';
    //   return post;
    // });
    // const postsDto: PostGetDto[] = posts.map((post) => {
    //   return {
    //     id: post.id,
    //     text: post.text,
    //     type: post.type,
    //     time: post.time,
    //     createdBy: post.createdBy,
    //     language: post.language,
    //   };
    // });

    return postsWithLiked;
  }
}
