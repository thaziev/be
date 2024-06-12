import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// ... other imports

@Module({
  // ... other module properties
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}