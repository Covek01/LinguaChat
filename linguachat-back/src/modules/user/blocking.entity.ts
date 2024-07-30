import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('blockings')

@Index(['user.id', 'blockedUser.id'], { unique: true }) // Define the index here
export class Blocking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.usersBlocking)
  @JoinColumn({name: 'userId'})
  user: User;

  @ManyToOne(() => User, user => user.blockedUsers)
  @JoinColumn({name: 'blockedId'})
  blockedUser: User; 
}
