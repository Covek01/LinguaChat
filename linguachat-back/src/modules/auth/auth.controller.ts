import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Res,
  Delete,
} from '@nestjs/common';
import { SignInDto, UserInsertDto } from '../../models/user.types';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: SignInDto })
  async logIn(@Request() req, @Res() response: Response) {
    try {
      const token = await this.authService.login(req.user);
      response.cookie('access_token', token.access_token, {
        secure: true,
        sameSite: 'none',
        httpOnly: false,
        maxAge: 1000 * 60 * 360,
      });

      return response.status(200).json({
        result: 'User logged in',
        access_token: 'aaaaa',
      });
    } catch (ex) {
      return response.status(500).json({
        result: 'Error user logging in',
      });
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  @ApiBody({ type: SignInDto })
  logOut(@Request() req, @Res() response: Response) {
    response.clearCookie('access_token');
    console.log('I am touched');
    return response.status(200).send('User has logged out');
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiBody({ type: UserInsertDto })
  async register(@Body() user_dto: UserInsertDto): Promise<string> {
    try {
      return await this.authService.register(user_dto);
    } catch (ex) {
      console.log('Error with inserting user');
      console.log(ex);

      return 'Error with user registration';
    }
  }
}
