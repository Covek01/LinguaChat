import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '../auth/auth.guard';
import { NullPost, PostGetDto, PostInsertDto, PostInterface, PostUpdateDto, PostWithLikedAndCount } from 'src/models/post.types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    @HttpCode(HttpStatus.OK)
    @Post('/add')
    async addPost(@Body() post: PostInsertDto) : Promise<PostInterface> {
        return await this.postService.addPostAndReturnResult(
            post.creatorId, 
            post.text, 
            post.type, 
            post.languageId
        ).catch( error => {
            console.log("Error with inserting post");
            console.log(error);

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Get('/get/:id')
    async getPost(@Param('id') id: string) : Promise<PostGetDto> {
        return await this.postService.getPost(
            parseInt(id, 0)
        ).catch( error => {
            console.log("Error with getting post");
            console.log(error);

            throw new Error(error);
        });
    }

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

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:id')
    async deletePost(@Param('id') id: string) : Promise<string> {
        return await this.postService.deletePost(
            parseInt(id, 0)
        ).catch( error => {
            console.log("Error with deleting post");
            console.log(error);

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Get('/getPostsOfUser/:userId')
    async getPostsOfUser(@Param('userId') userId: string) : Promise<PostGetDto[]> {
        return await this.postService.getPostsOfUser(
            parseInt(userId, 0)
        ).catch( error => {
            console.log("Error with getting posts");
            console.log(error);

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Get('/getPostsOfMe')
    async getPostsOfMe(@Request() request) : Promise<PostGetDto[]> {
        const myid = request.user.id;
        return await this.postService.getPostsOfUser(
            myid
        ).catch( error => {
            console.log("Error with getting posts");
            console.log(error);

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Get('/getPostsOfUserWithLikedStatus/:userId')
    async getPostsOfUserWithLikedStatus(@Request() req, @Param('userId') userId: string) : Promise<PostWithLikedAndCount[]> {
        const myid: number = req.user.id;
        console.log(myid);
        return await this.postService.getPostsOfUserWithLikedStatus(
            myid,
            parseInt(userId, 0)
        ).catch( error => {
            console.log("Error with getting posts");
            console.log(error);

            throw new Error(error);
        });
    }

    @HttpCode(HttpStatus.OK)
    @Get('/getPostsWithLikedStatusByMe')
    async getPostsWithLikedStatusByMe(@Request() req) : Promise<PostWithLikedAndCount[]> {
        const myid: number = req.user.id;
        console.log(myid);
        return await this.postService.getPostsOfUserWithLikedStatus(
            myid,
            myid
        ).catch( error => {
            console.log("Error with getting posts");
            console.log(error);

            throw new Error(error);
        });
    }
}
