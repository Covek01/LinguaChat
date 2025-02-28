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

    @Column({nullable: false})
    time: Date;

    //Post relationships
    @ManyToOne(() => Post, (post) => post.comments, {
        nullable: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: 'postRelatedToId'})
    postRelatedTo: Post;

    //User relationships
    @ManyToOne(() => User, (user) => user.comments, {
        nullable: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    userCommented: User;
}
