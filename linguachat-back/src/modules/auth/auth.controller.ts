import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Res } from '@nestjs/common';
import { SignInDto, UserInsertDto } from '../../models/user.types';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

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
    async signIn(@Request() req, @Res() response: Response) {
        try {
            const token = await this.authService.login(req.user);
            response.cookie('access_token', token.access_token, {
                secure: false,
                sameSite: 'none',
            });
            return response.status(200).json({
                result: 'User logged in',
                access_token: 'aaaaa'
            });
        } catch (ex) {
            return response.status(500).json({
                result: 'Error user logging in'
            });
        }

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
