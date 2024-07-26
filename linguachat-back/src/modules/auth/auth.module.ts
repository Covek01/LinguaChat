import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'config/jwt-config';
import { configFile } from 'config/config';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [forwardRef(() => UserModule), JwtModule.registerAsync(jwtConfig)],
    providers: [AuthService, AuthGuard],
    controllers: [AuthController],
    exports: [AuthGuard]
})
export class AuthModule {}
