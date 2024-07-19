import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @ManyToOne(() => User, (user) => user.connectionsFirst)
    @JoinColumn({ name: 'first_id' })
    connectionFirst: User;

    @ManyToOne(() => User, (user) => user.connectionsSecond)
    @JoinColumn({ name: 'second_id' })
    connectionSecond: User;
}
