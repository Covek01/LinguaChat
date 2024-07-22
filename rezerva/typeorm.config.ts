
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Language } from 'src/modules/language/language.entity';
// import { Post } from 'src/modules/post/post.entity';
// import { ConnectionOptions, DataSource, DataSourceOptions } from 'typeorm';
// import { Comment } from 'src/modules/comment/comment.entity'
// import { User } from 'src/user/user.entity';
// import { Connection } from 'src/user/connection.entity';
// import { Blocking } from 'src/user/blocking.entity';
// import { Connection } from 'src/modules/user/connection.entity';

// export const configTypeOrm: DataSourceOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'password',
//   entities: [Language, Post, Comment, User, Connection, Blocking],
//   synchronize: true,
//   name: "postgresConnection"
// }

// export const dataSourcePostgres = new DataSource(configTypeOrm)