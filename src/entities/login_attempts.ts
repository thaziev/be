import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@entities/users';

@Entity('login_attempts')
export class LoginAttempt {
  @Column({ type: 'integer', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  attempt_time: Date;

  @Column({ nullable: true, type: 'boolean', default: false })
  success: boolean = false;

  @Column({ nullable: true, type: 'integer' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.login_attempts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
