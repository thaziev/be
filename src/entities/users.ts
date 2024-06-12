import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { LoginAttempt } from '@entities/login_attempts';

@Entity('users')
export class User {
  @Column({ type: 'integer', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, type: 'varchar' })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  password_hash: string;

  @Column({ nullable: true, type: 'timestamp' })
  last_login: Date;

  @OneToMany(() => LoginAttempt, (loginAttempt) => loginAttempt.user, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  login_attempts: LoginAttempt[];
}
