import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Language } from '../language/language.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @ManyToMany(() => User, (user) => user.postsLiked)
    likedByUsers: User[];

    @ManyToOne(() => User, (user) => user.createdPosts)
    createdBy: User;

    @OneToOne(() => Language)
    @JoinColumn()
    language: Language
}
