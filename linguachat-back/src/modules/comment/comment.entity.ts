import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
// import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { User } from 'src/modules/user/user.entity';


@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    //Post relationships
    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'postRelatedToId'})
    postRelatedTo: Post;

    //User relationships
    @ManyToOne(() => User, (user) => user.comments)
    userCommented: User;
}
