import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  since: Date;

  @Column({ unique: true })
  connectionName: string;

  @ManyToOne(() => User, (user) => user.connectionsFirst, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'first_id' })
  firstUser: User;

  @ManyToOne(() => User, (user) => user.connectionsSecond, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'second_id' })
  secondUser: User;

}
