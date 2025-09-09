import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { User } from 'src/modules/user/user.entity';
import { UserLearningLanguage } from '../user/UserLearningLanguage.entity';
import * as PostEntity from 'src/modules/post/post.entity';

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    name: string;

    @Column({default: 0})
    popularity: number;

    // @ManyToMany(() => User, (user) => user.languagesLearning)
    // learnedBy: User[];

    @OneToMany(() => UserLearningLanguage, (userLanguage) => userLanguage.language, {
    })
    userLanguages: UserLearningLanguage[];

    @ManyToMany(() => User, (user) => user.languagesNative, {
        nullable: false
    })
    nativeBy: User[];

    @OneToMany(() => PostEntity.Post, (post) => post.language, {
        nullable: false
    })
    postsReferencedIn: User[];
}
