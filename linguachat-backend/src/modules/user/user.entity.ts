import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Language } from '../language/language.entity';
import { Connection } from './connection.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    username: string;

    @Column()
    email: string;

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

    @ManyToMany(() => User, (user) => user.blockedBy)
    @JoinTable({
        name: 'Blockings',
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "blocked_id",
            referencedColumnName: "id"
        }
    })
    userBlocked: User[];

    @ManyToMany(() => User, (user) => user.userBlocked)
    blockedBy: User[];


    @ManyToMany(() => Language, (language) => language.learnedBy)
    @JoinTable({
        name: 'Users_Learning_Languages',
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


    @ManyToMany(() => Language, (language) => language.nativeBy)
    @JoinTable({
        name: 'Users_Learning_Languages',
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

    @OneToMany(() => Connection, (connection) => connection.connectionFirst)
    connectionsFirst: User[]

    @OneToMany(() => Connection, (connection) => connection.connectionSecond)
    connectionsSecond: User[]
}
