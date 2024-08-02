import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { User } from 'src/modules/user/user.entity';
import { UserLearningLanguage } from '../user/UserLearningLanguage.entity';

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    name: string;

    @Column()
    popularity: number;

    // @ManyToMany(() => User, (user) => user.languagesLearning)
    // learnedBy: User[];

    @OneToMany(() => UserLearningLanguage, (userLanguage) => userLanguage.language, {
        cascade: true,
    })
    userLanguages: UserLearningLanguage[];

    @ManyToMany(() => User, (user) => user.languagesNative, {
        nullable: false
    })
    nativeBy: User[];
}
