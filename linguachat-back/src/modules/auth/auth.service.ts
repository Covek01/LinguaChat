import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
//import { sha1 } from './sha1.hash';
import { JwtService } from '@nestjs/jwt';
import { UserGetDto, UserInterface } from 'src/models/models.type';

@Injectable()
export class AuthService {
    jwtService: any;
    constructor(
        private userService: UserService,
        // private jwtService: JwtService
    ){}

    async signIn(username: string, password: string): Promise<any> {
        const user = await this.userService.getByUsername(username);
        if (user?.passHash !== password) {
          throw new UnauthorizedException();
        }

        const {passHash, ...userWithoutPassword} = user;
        const payload:UserGetDto = userWithoutPassword;
        
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }
}
