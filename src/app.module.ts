import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RecordModule } from './record/record.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    RecordModule,
    PrismaModule,
    SessionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
