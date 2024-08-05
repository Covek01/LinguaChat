
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from 'src/modules/language/language.entity';
import { Post } from 'src/modules/post/post.entity';
import { ConnectionOptions, DataSource, DataSourceOptions } from 'typeorm';
import { Comment } from 'src/modules/comment/comment.entity'
import { User } from 'src/modules/user/user.entity';
import { Connection } from 'src/modules/connection/connection.entity';
import { Blocking } from 'src/modules/user/blocking.entity';
import { UserLearningLanguage } from 'src/modules/user/UserLearningLanguage.entity';

// import { Connection } from 'src/modules/user/connection.entity';

export const configTypeOrm: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  entities: [Language, Post, Comment, User, Connection, Blocking, UserLearningLanguage],
  synchronize: true,
  name: "postgresConnection"
}
