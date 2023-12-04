// date.module.ts
import { Module } from '@nestjs/common';
import { DateService } from './date.service'; // Замените на путь к вашему DateService

@Module({
  providers: [DateService],
  exports: [DateService], // Экспортируйте DateService, если вы планируете использовать его в других модулях
})
export class DateModule {}
