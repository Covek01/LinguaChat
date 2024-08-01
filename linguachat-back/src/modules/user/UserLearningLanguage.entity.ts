import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Index, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Language } from 'src/modules/language/language.entity';

@Entity()
@Index(['user.id', 'language.id'], { unique: true }) // Define the index here
export class UserLearningLanguage {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userLanguagesLearning)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Language, (language) => language.userLanguages)
    @JoinColumn({ name: 'language_id' })
    language: Language;

    @Column({ type: 'varchar', length: 50, nullable: false })
    level: string;
}
