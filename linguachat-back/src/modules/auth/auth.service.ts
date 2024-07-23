import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
//import { sha1 } from './sha1.hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async signIn(username: string, password: string): Promise<any> {
        const user = await this.userService.getByUsername(username);
        if (user?.passHash !== password) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username }
        const { passHash, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
      }
}
