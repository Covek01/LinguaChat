import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from 'src/modules/user/user.entity';
import { Post } from 'src/modules/post/post.entity';
import { CommentGetDto } from 'src/models/comment.types';

@Injectable()
export class CommentService {
    constructor(@InjectDataSource('postgresConnection') private dataSource: DataSource) {}

    async addComment(
        userId: number,
        postId: number,
        commentText: string
    ): Promise<string> {
        const user: User | null = await this.dataSource
            .getRepository(User)
            .findOne({ where: { id: userId } });

        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        console.log(`Post id ${postId}`)
        const post: Post | null = await this.dataSource
            .getRepository(Post)
            .findOne({ where: { id: postId } });

        if (!post) {
            throw new Error(`Post with ID ${postId} not found`);
        }

        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Comment)
            .values({
                text: commentText,
                postRelatedTo: post,
                userCommented: user,
            })
            .execute();

        return 'Comment added successfully';
    }

    async getComment(commentId: number): Promise<CommentGetDto> {
        const comment: Comment | null = await this.dataSource
            .getRepository(Comment)
            .findOne({
                where: { id: commentId },
                relations: ['postRelatedTo', 'userCommented'],
            });

        if (!comment) {
            throw new Error(`Comment with ID ${commentId} doesn't exist`);
        }

        const commentGetDto: CommentGetDto = {
            ...comment,
            postRelatedTo: comment.postRelatedTo,
            userCommented: comment.userCommented,
        };

        return commentGetDto;
    }

    async updateComment(
        commentId: number,
        commentText: string
    ): Promise<CommentGetDto> {
        await this.dataSource
            .createQueryBuilder()
            .update(Comment)
            .set({ text: commentText })
            .where("id = :commentId", { commentId })
            .execute();

        const updatedComment: Comment | null = await this.dataSource
            .getRepository(Comment)
            .findOne({
                where: { id: commentId },
                relations: ['postRelatedTo', 'userCommented'],
            });

        if (!updatedComment) {
            throw new Error(`Updated comment with ID ${commentId} doesn't exist`);
        }

        const commentGetDto: CommentGetDto = {
            ...updatedComment,
            postRelatedTo: updatedComment.postRelatedTo,
            userCommented: updatedComment.userCommented,
        };

        return commentGetDto;
    }

    async deleteComment(commentId: number): Promise<string> {
        await this.dataSource
            .createQueryBuilder()
            .delete()
            .from(Comment)
            .where("id = :commentId", { commentId })
            .execute();

        return 'Comment deleted successfully';
    }

    async getCommentsOfPost(postId: number): Promise<CommentGetDto[]> {
        const comments: Comment[] | null = await this.dataSource
            .getRepository(Comment)
            .createQueryBuilder('comment')
            .innerJoinAndSelect('comment.postRelatedTo', 'postRelatedTo')
            .innerJoinAndSelect('comment.userCommented', 'userCommented')
            .where('postRelatedTo.id = :postId', {postId})
            .getMany();

        if (!comments){
            throw new Error("Error with getting comments");
        }

        const postsDto: CommentGetDto[] = comments.map(comment => {
            return {
                id: comment.id,
                text: comment.text,
                postRelatedTo: comment.postRelatedTo,
                userCommented: comment.userCommented
            };
        });

        return postsDto;
    }
}
