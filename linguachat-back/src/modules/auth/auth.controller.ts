import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { SignInDto, UserInsertDto } from '../../models/user.types';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // @HttpCode(HttpStatus.OK)
    // @Post('login')
    // @ApiBody({ type: SignInDto })
    // signIn(@Body() signInObject: SignInDto) {
    //     console.log(signInObject)
    //     return this.authService.signIn(signInObject.username, signInObject.password);
    // }

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: SignInDto })
    signIn(@Request() req) {
        return this.authService.login(req.user);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('logout')
    @ApiBody({ type: SignInDto })
    signOut(@Request() req) {
        return req.logout();
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
