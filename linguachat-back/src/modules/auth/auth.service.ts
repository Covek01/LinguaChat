import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
//import { sha1 } from './sha1.hash';
import { JwtService } from '@nestjs/jwt';
import { UserGetDto, UserInsertDto, UserInterface } from 'src/models/user.types';
import { sha1 } from './sha1.hash';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { MailService } from 'src/mail/mail.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectDataSource('postgresConnection') private dataSource: DataSource,
        private mailService: MailService
    ){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getByUsername(username);
        console.log(username)
        if (user?.passHash === sha1(password)) {
          const {passHash, ...userWithoutPassword} = user;
          const payload: UserGetDto = userWithoutPassword;

          return payload;
        }
        
        return null;
    }

    async signIn(username: string, password: string): Promise<any> {
        const payload: UserGetDto = await this.validateUser(username, password);
        if (payload === null) {
            throw new UnauthorizedException();
        }
        
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }

    async login(payload: UserGetDto): Promise<any> {
      if (payload === null) {
          throw new UnauthorizedException();
      }
      
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }


    async register(user_dto: UserInsertDto) : Promise<string> {
      const user = {
          name: user_dto.name,
          surname: user_dto.surname,
          username: user_dto.username,
          email: user_dto.email, 
          passHash: sha1(user_dto.password),
          since: new Date(),
          born: user_dto.born,
          comment: '',
          country: user_dto.country,
          city: user_dto.city,
          role: "User",
          confirmed: false
      }
      
        await this.dataSource
        .getRepository(User)
        .insert(user);


        return "User added successfully"
        // const token_object = await this.signIn(user_dto.username, user_dto.password);
        // const userDto: UserGetDto = plainToInstance(UserGetDto, user, { excludeExtraneousValues: true });
        // console.log(userDto)
        // console.log(token_object.access_token)
        
        // await this.mailService.sendUserConfirmation(userDto, token_object.access_token);
  }
}
