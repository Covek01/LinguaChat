import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Connection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    since: Date;

    @Column({unique: true})
    connection_name: string;

    @ManyToOne(() => User, (user) => user.connectionsFirst, {
        nullable: false
    })
    @JoinColumn({ name: 'first_id' })
    connectionFirst: User;

    @ManyToOne(() => User, (user) => user.connectionsSecond, {
        nullable: false
    })
    @JoinColumn({ name: 'second_id' })
    connectionSecond: User;
}
