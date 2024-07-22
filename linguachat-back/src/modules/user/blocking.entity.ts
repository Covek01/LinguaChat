import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { User } from './user.entity';

@Entity('blockings')
@Index(['userId', 'blockedId'], { unique: true }) // Define the index here
export class Blocking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  blockedId: number;

  @ManyToOne(() => User, user => user.blockedUsers)
  user: User;

  @ManyToOne(() => User, user => user.usersBlocking)
  blockedUser: User;
}
