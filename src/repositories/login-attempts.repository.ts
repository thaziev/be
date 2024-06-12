import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { LoginAttempt } from '@entities/login_attempts';

@Injectable()
export class LoginAttemptRepository extends BaseRepository<LoginAttempt> {}
