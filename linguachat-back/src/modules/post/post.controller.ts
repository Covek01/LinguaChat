import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '../auth/auth.guard';
import { NullPost, PostGetDto, PostInsertDto, PostInterface, PostUpdateDto } from 'src/models/post.types';

@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/add')
    async addPost(@Body() comment: PostInsertDto) : Promise<string> {
        return await this.postService.addPost(
            comment.creatorId, 
            comment.text, 
            comment.type, 
            comment.languageId
        ).catch( error => {
            console.log("Error with inserting post");
            console.log(error);

            return "Error with inserting post"
        });
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('/get/:id')
    async getPost(@Param('id') id: string) : Promise<PostGetDto> {
        return await this.postService.getPost(
            parseInt(id, 0)
        ).catch( error => {
            console.log("Error with getting post");
            console.log(error);

            return NullPost
        });
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Put('/update')
    async updatePost(@Body() post: PostUpdateDto) : Promise<PostGetDto> {
        return await this.postService.updatePost(
            post.id,
            post.text,
            post.type,
            post.languageId
        ).catch( error => {
            console.log("Error with updating post");
            console.log(error);

            return NullPost
        });
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:id')
    async deletePost(@Param('id') id: string) : Promise<string> {
        return await this.postService.deletePost(
            parseInt(id, 0)
        ).catch( error => {
            console.log("Error with deleting post");
            console.log(error);

            return "Error with deleting post"
        });
    }
}
