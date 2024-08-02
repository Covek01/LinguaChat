import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '../auth/auth.guard';
import { PostInterface } from 'src/models/post.types';

@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/add')
    async addLanguage(@Body() comment: PostInterface) : Promise<string> {
        return await this.postService.addPost(comment.id, comment.text, comment.type)
                    .catch( error => {
                        console.log("Error with inserting language");
                        console.log(error);

                        return "Error with inserting language"
                    });
    }
}
