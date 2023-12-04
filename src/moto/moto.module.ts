// moto.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moto } from '../users/entities/moto.entity';
import { MotoController } from './moto.controller';
import { MotoService } from './moto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Moto])],
  controllers: [MotoController],
  providers: [MotoService],
})
export class MotoModule {}
