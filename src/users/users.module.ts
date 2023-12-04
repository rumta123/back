import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DateModule } from '../date/date.module'
@Module({
  imports: [TypeOrmModule.forFeature([Users]), DateModule,],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}