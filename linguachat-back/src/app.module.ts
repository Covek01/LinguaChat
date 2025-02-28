import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configTypeOrm } from 'config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from './modules/comment/comment.module';
import { PostModule } from './modules/post/post.module';
import { LanguageModule } from './modules/language/language.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configFile } from 'config/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'config/jwt-config';
import { MailModule } from './mail/mail.module';
import { ConnectionModule } from './modules/connection/connection.module';
import { PassportModule } from '@nestjs/passport';
import { configRedis } from 'config/redis.config';
import { ChatModule } from './modules/chat/chat.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    ConfigModule.forRoot(configFile),
    JwtModule.registerAsync(jwtConfig),
    TypeOrmModule.forRoot({ ...configTypeOrm, name: 'postgresConnection' }),
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
    PassportModule,
    CommentModule,
    PostModule,
    LanguageModule,
    UserModule,
    AuthModule,
    MailModule,
    ConnectionModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
