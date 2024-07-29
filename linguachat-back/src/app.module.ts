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




@Module({
  imports: [ConfigModule.forRoot(configFile), 
      JwtModule.registerAsync(jwtConfig),
      TypeOrmModule.forRoot({...configTypeOrm, name: 'postgresConnection'}),
      CommentModule, PostModule, LanguageModule, UserModule, AuthModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
