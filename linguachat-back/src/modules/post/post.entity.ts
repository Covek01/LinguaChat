import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Comment } from '../comment/comment.entity';
import { User } from 'src/modules/user/user.entity';
import { Language } from '../language/language.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  time: Date;

  //User relationships
  @ManyToMany(() => User, (user) => user.postsLiked, {
    cascade: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  likedByUsers: User[];

  @ManyToOne(() => User, (user) => user.createdPosts, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  //Language relationships
  @ManyToOne(() => Language, (language) => language.postsReferencedIn, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'languageId' })
  language: Language;

  //Comment relationships
  @OneToMany(() => Comment, (comment) => comment.postRelatedTo, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comments: Comment[];
}
