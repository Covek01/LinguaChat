import { Language } from 'src/modules/language/language.entity';
import { Post } from 'src/modules/post/post.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  Index,
} from 'typeorm';
import { Connection } from '../connection/connection.entity';
import { Comment } from 'src/modules/comment/comment.entity';
import { Blocking } from './blocking.entity';
import { UserLearningLanguage } from './UserLearningLanguage.entity';
import { Role } from '../auth/authorization/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true })
  passHash: string;

  @Column()
  since: Date;

  @Column()
  born: Date;

  @Column()
  comment: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column({ nullable: false, type: 'enum', enum: Role, enumName: 'user_role' , default: Role.User })
  role: string;

  @Column()
  confirmed: boolean;
  @OneToMany(() => Blocking, (blocking) => blocking.user)
  blockedUsers: Blocking[];

  @OneToMany(() => Blocking, (blocking) => blocking.blockedUser)
  usersBlocking: Blocking[];

  @OneToMany(
    () => UserLearningLanguage,
    (userLearningLanguage) => userLearningLanguage.user,
  )
  userLanguagesLearning: UserLearningLanguage[];

  @ManyToMany(() => Language, (language) => language.nativeBy, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'users_native_languages',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'language_id',
      referencedColumnName: 'id',
    },
  })
  languagesNative: Language[];

  //Posts relationships
  @ManyToMany(() => Post, (post) => post.likedByUsers, {
    cascade: true,
    nullable: false,
  })
  @JoinTable({
    name: 'users_like_posts',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
  })
  postsLiked: Post[];

  @OneToMany(() => Post, (post) => post.createdBy, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  createdPosts: Post[];

  //Connections relationships
  @OneToMany(() => Connection, (connection) => connection.firstUser, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  connectionsFirst: Connection[];

  @OneToMany(() => Connection, (connection) => connection.secondUser, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  connectionsSecond: Connection[];

  @OneToMany(() => Comment, (comment) => comment.userCommented, {
    cascade: true,
  })
  comments: Comment[];
}
