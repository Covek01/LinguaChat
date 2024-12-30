import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '../auth/auth.guard';
import { CommentGetDto, CommentInsertDto, CommentInterface, NullComment } from 'src/models/comment.types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';
import { ReturnMessage } from 'src/models/models.type';

@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService){}

    @HttpCode(HttpStatus.OK)
    @Post('/add')
    async addComment(@Body() comment: CommentInsertDto): Promise<CommentGetDto> {
        console.log(`UserId ${comment.userCommentedId} Post ${comment.postRelatedToId}
             Text ${comment.text}`)
        return await this.commentService.addComment(
            comment.userCommentedId,
            comment.postRelatedToId,
            comment.text
        ).catch(error => {
            console.log("Error with inserting comment");
            console.log(error);

            throw new Error(error); 
        });
    }

    @HttpCode(HttpStatus.OK)
    @Get('/get/:id')
    async getComment(@Param('id') id: string): Promise<CommentGetDto> {
        return await this.commentService.getComment(
            parseInt(id, 0)
        ).catch(error => {
            console.log("Error with getting comment");
            console.log(error);

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Put('/update')
    async updateComment(@Body() comment: CommentInterface): Promise<CommentGetDto> {
        return await this.commentService.updateComment(
            comment.id,
            comment.text
        ).catch(error => {
            console.log("Error with updating comment");
            console.log(error);

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:id')
    async deleteComment(@Param('id') id: string): Promise<ReturnMessage> {
        return await this.commentService.deleteComment(
            parseInt(id, 0)
        ).catch(error => {
            console.log("Error with deleting comment");
            console.log(error);

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Get('/getCommentsOfPost/:postId')
    async getCommentsOfPost(@Param('postId') postId: string): Promise<CommentGetDto[]> {
        return await this.commentService.getCommentsOfPost(
            parseInt(postId, 0)
        ).catch(error => {
            console.log("Error with deleting comment");
            console.log(error);

            throw new Error(error);
        });
    }
}
