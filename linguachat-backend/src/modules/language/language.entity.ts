import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    popularity: number;

    @ManyToMany(() => User, (user) => user.languagesLearning)
    learnedBy: User[];

    @ManyToMany(() => User, (user) => user.languagesNative)
    nativeBy: User[];
}
