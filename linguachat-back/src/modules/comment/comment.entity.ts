import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
// import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { User } from 'src/modules/user/user.entity';


@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    text: string;

    //Post relationships
    @ManyToOne(() => Post, (post) => post.comments, {
        nullable: false
    })
    @JoinColumn({ name: 'postRelatedToId'})
    postRelatedTo: Post;

    //User relationships
    @ManyToOne(() => User, (user) => user.comments, {
        nullable: false
    })
    userCommented: User;
}
