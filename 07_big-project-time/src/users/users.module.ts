import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UsersService,
    AuthService,
    CurrentUserInterceptor,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
