import { Language } from 'src/modules/language/language.entity';
import { Post } from 'src/modules/post/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, Index } from 'typeorm';
import { Connection } from './connection.entity';
import { Comment } from 'src/modules/comment/comment.entity';
import { Blocking } from './blocking.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    @Column()
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

    @Column()
    role: string;

    @Column()
    confirmed: boolean;
    //Users relationships
    // @ManyToMany(() => User, (user) => user.blockedBy, {
    //     cascade: true,
    // })
    // @JoinTable({
    //     name: 'blockings',
    //     joinColumn: {
    //         name: "user_id",
    //         referencedColumnName: "id"
    //     },
    //     inverseJoinColumn: {
    //         name: "blocked_id",
    //         referencedColumnName: "id"
    //     }
    // })
    // userBlocked: User[];


    // @ManyToMany(() => User, (user) => user.userBlocked)
    // blockedBy: User[];
      // Define relationships using the Blocking entity
    @OneToMany(() => Blocking, blocking => blocking.user)
    blockedUsers: Blocking[];

    @OneToMany(() => Blocking, blocking => blocking.blockedUser)
    usersBlocking: Blocking[];


    //Language relationships
    @ManyToMany(() => Language, (language) => language.learnedBy, {
        cascade: true,
    })
    @JoinTable({
        name: 'users_learning_languages',
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "language_id",
            referencedColumnName: "id"
        }
    })
    languagesLearning: Language[];


    @ManyToMany(() => Language, (language) => language.nativeBy, {
        cascade: true,
    })
    @JoinTable({
        name: 'users_learning_Languages',
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "language_id",
            referencedColumnName: "id"
        }
    })
    languagesNative: Language[];


    //Posts relationships
    @ManyToMany(() => Post, (post) => post.likedByUsers, {
        cascade: true,
    })
    @JoinTable({
        name: 'users_like_posts',
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "post_id",
            referencedColumnName: "id"
        }
    })
    postsLiked: Post[];

    @OneToMany(() => Post, (post) => post.createdBy)
    createdPosts: Post[];

    //Connections relationships
    @OneToMany(() => Connection, (connection) => connection.connectionFirst, {
        cascade: true,
    })
    connectionsFirst: Connection[]

    @OneToMany(() => Connection, (connection) => connection.connectionSecond, {
        cascade: true,
    })
    connectionsSecond: Connection[]

    @OneToMany(() => Comment, (comment) => comment.userCommented, {
        cascade: true,
    })
    comments: Comment[]
}