import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'config/jwt-config';
import { configFile } from 'config/config';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [UserModule, JwtModule.registerAsync(jwtConfig)],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
