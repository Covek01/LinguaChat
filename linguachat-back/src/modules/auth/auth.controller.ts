import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDto, UserInsertDto } from '../../models/user.types';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiBody({ type: SignInDto })
    signIn(@Body() signInObject: SignInDto) {
        console.log(signInObject)
        return this.authService.signIn(signInObject.username, signInObject.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    @ApiBody({ type: UserInsertDto })
    async register(@Body() user_dto: UserInsertDto) : Promise<string> {
        try{
            return await this.authService.register(user_dto);
        } catch(ex){
            console.log("Error with inserting user");
            console.log(ex);

            return "Error with user registration"
        }
    }
}
