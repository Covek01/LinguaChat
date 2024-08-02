import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '../auth/auth.guard';
import { CommentGetDto, CommentInsertDto, CommentInterface, NullComment } from 'src/models/comment.types';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService){}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/add')
    async addComment(@Body() comment: CommentInsertDto): Promise<string> {
        console.log(`UserId ${comment.userCommentedId} Post ${comment.postRelatedToId}
             Text ${comment.text}`)
        return await this.commentService.addComment(
            comment.userCommentedId,
            comment.postRelatedToId,
            comment.text
        ).catch(error => {
            console.log("Error with inserting comment");
            console.log(error);

            return "Error with inserting comment";
        });
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('/get/:id')
    async getComment(@Param('id') id: string): Promise<CommentGetDto> {
        return await this.commentService.getComment(
            parseInt(id, 0)
        ).catch(error => {
            console.log("Error with getting comment");
            console.log(error);

            return NullComment;
        });
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Put('/update')
    async updateComment(@Body() comment: CommentInterface): Promise<CommentGetDto> {
        return await this.commentService.updateComment(
            comment.id,
            comment.text
        ).catch(error => {
            console.log("Error with updating comment");
            console.log(error);

            return NullComment;
        });
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:id')
    async deleteComment(@Param('id') id: string): Promise<string> {
        return await this.commentService.deleteComment(
            parseInt(id, 0)
        ).catch(error => {
            console.log("Error with deleting comment");
            console.log(error);

            return "Error with deleting comment";
        });
    }
}
