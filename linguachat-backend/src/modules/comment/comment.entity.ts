import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    //Comment relationships
    @ManyToOne(() => Post, (post) => post.writtenBy)
    postRelatedTo: Post;

    //User relationships
    @ManyToOne(() => User, (user) => user.comments)
    userCommented: User;
}
