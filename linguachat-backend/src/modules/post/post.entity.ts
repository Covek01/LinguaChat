import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, OneToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Language } from '../language/language.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    //User relationships
    @ManyToMany(() => User, (user) => user.postsLiked)
    likedByUsers: User[];

    @ManyToOne(() => User, (user) => user.createdPosts)
    createdBy: User;

    //Language relationships
    @OneToOne(() => Language)
    @JoinColumn()
    language: Language

    //Comment relationships
    @OneToMany(() => Comment, (comment) => comment.postRelatedTo)
    writtenBy: Comment[];
}
