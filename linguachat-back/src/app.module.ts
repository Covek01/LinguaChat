import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configTypeOrm, dataSourcePostgres } from 'typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from './modules/comment/comment.module';
import { PostModule } from './modules/post/post.module';
import { LanguageModule } from './modules/language/language.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';




@Module({
  imports: [TypeOrmModule.forRoot({...configTypeOrm, name: 'postgresConnection'}),
    CommentModule, PostModule, LanguageModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
