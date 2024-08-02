import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, OneToOne, OneToMany } from 'typeorm';

import { Comment } from '../comment/comment.entity';
import { User } from 'src/modules/user/user.entity';
import { Language } from '../language/language.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    type: string;

    @Column({nullable: false})
    text: string;

    //User relationships
    @ManyToMany(() => User, (user) => user.postsLiked)
    likedByUsers: User[];

    @ManyToOne(() => User, (user) => user.createdPosts, {nullable: false})
    @JoinColumn({ name: 'createdById'})
    createdBy: User;

    //Language relationships
    @OneToOne(() => Language, {nullable: false})
    @JoinColumn({ name: 'languageId' })
    language: Language;

    //Comment relationships
    @OneToMany(() => Comment, (comment) => comment.postRelatedTo)
    comments: Comment[];
}
