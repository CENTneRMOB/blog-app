import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [AuthModule],
  providers: [UserService],
})
export class UserModule {}
