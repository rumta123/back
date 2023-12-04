// tour-date.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourDateController } from './tour-date.controller';
import { TourDateService } from './tour-date.service';
import { TourDate } from '../users/entities/tour-date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TourDate])],
  controllers: [TourDateController],
  providers: [TourDateService],
})
export class TourDateModule {}
