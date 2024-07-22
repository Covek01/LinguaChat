import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from 'src/modules/user/user.entity';

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    popularity: number;

    @ManyToMany(() => User, (user) => user.languagesLearning)
    learnedBy: User[];

    @ManyToMany(() => User, (user) => user.languagesNative)
    nativeBy: User[];
}
