import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
// import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    //Post relationships
    @ManyToOne(() => Post, (post) => post.writtenBy)
    postRelatedTo: Post;

    //User relationships
    @ManyToOne(() => User, (user) => user.comments)
    userCommented: User;
}
