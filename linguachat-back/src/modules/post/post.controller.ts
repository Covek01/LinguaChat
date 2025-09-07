import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  PostGetDto,
  PostInsertDto,
  PostInterface,
  PostUpdateDto,
  PostWithLikedAndCount,
} from 'src/models/post.types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReturnMessage } from 'src/models/models.type';
import { RolesGuard } from '../auth/authorization/roles.guard';
import { Role } from '../auth/authorization/roles.enum';
import { Roles } from '../auth/authorization/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.User, Role.Admin)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/add')
  async addPost(@Body() post: PostInsertDto): Promise<PostInterface> {
    console.log(post);
    return await this.postService
      .addPostAndReturnResult(
        post.creatorId,
        post.title,
        post.text,
        post.type,
        post.languageId,
      )
      .catch((error) => {
        console.log('Error with inserting post');
        console.log(error);

        throw new Error(error);
      });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/get/:id')
  async getPost(@Param('id') id: string): Promise<PostGetDto> {
    return await this.postService.getPost(parseInt(id)).catch((error) => {
      console.log('Error with getting post');
      console.log(error);

      throw new Error(error);
    });
  }

  @HttpCode(HttpStatus.OK)
  @Put('/update')
  async updatePost(@Body() post: PostUpdateDto): Promise<PostGetDto> {
    return await this.postService
      .updatePost(post.id, post.text, post.type, post.languageId)
      .catch((error) => {
        console.log('Error with updating post');
        console.log(error);

        throw new Error(error);
      });
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  async deletePost(@Param('id') id: string): Promise<ReturnMessage> {
    return await this.postService.deletePost(parseInt(id)).catch((error) => {
      console.log('Error with deleting post');
      console.log(error);

      throw new Error(error);
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/getPostsOfUser/:userId')
  async getPostsOfUser(@Param('userId') userId: string): Promise<PostGetDto[]> {
    return await this.postService
      .getPostsOfUser(parseInt(userId))
      .catch((error) => {
        console.log('Error with getting posts');
        console.log(error);

        throw new Error(error);
      });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/getPostsOfMe')
  async getPostsOfMe(@Request() request): Promise<PostGetDto[]> {
    const myid = request.user.id;
    return await this.postService.getPostsOfUser(myid).catch((error) => {
      console.log('Error with getting posts');
      console.log(error);

      throw new Error(error);
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/getPostsOfUserWithLikedStatus/:userId')
  async getPostsOfUserWithLikedStatus(
    @Request() req,
    @Param('userId') userId: string,
  ): Promise<PostWithLikedAndCount[]> {
    const myid: number = req.user.id;
    console.log(myid);
    return await this.postService
      .getPostsOfUserWithLikedStatus(myid, parseInt(userId))
      .catch((error) => {
        console.log('Error with getting posts');
        console.log(error);

        throw new Error(error);
      });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/getPostsOfConnectedUsersWithLikedStatusByMe/:limit/:offset')
  async getPostsOfConnectedUsersWithLikedStatusByMe(
    @Request() req,
    @Param('limit') limit,
    @Param('offset') offset,
  ): Promise<PostWithLikedAndCount[]> {
    const myid: number = req.user.id;
    console.log(myid);
    return await this.postService
      .getPostsOfConnectedUsersWithLikedStatus(
        myid,
        parseInt(limit, 10),
        parseInt(offset, 10),
      )
      .catch((error) => {
        console.log('Error with getting posts');
        console.log(error);

        throw new Error(error);
      });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/getPostsWithLikedStatusByMe')
  async getPostsWithLikedStatusByMe(
    @Request() req,
  ): Promise<PostWithLikedAndCount[]> {
    const myid: number = req.user.id;
    console.log(myid);
    return await this.postService
      .getPostsOfUserWithLikedStatus(myid, myid)
      .catch((error) => {
        console.log('Error with getting posts');
        console.log(error);

        throw new Error(error);
      });
  }

  @HttpCode(HttpStatus.OK)
  @Put('/likePost/:userId/:postId')
  async likePost(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ): Promise<string> {
    console.log('TAKNUT SAM');
    return await this.postService
      .likePost(parseInt(userId), parseInt(postId))
      .catch((error) => {
        console.log('Error with liking post');
        console.log(error);

        throw new Error(error);
      });
  }

  @HttpCode(HttpStatus.OK)
  @Put('/unlikePost/:userId/:postId')
  async unlikePost(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ): Promise<string> {
    console.log('TAKNUT SAM');
    return await this.postService
      .unlikePost(parseInt(userId), parseInt(postId))
      .catch((error) => {
        console.log('Error with unliking post');
        console.log(error);

        throw new Error(error);
      });
  }
}
