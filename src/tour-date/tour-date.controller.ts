// tour-date.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { TourDateService } from './tour-date.service';
import { TourDate } from '../users/entities/tour-date.entity'; // добавьте этот импорт

@Controller('tour-dates')
export class TourDateController {
  constructor(private readonly tourDateService: TourDateService) {}

  @Post()
  createTourDate(@Body() tourDateData: Partial<TourDate>) {
    return this.tourDateService.createTourDate(tourDateData);
  }

  @Get(':tourId/tour-date')
  getTourDatesByTourId(@Param('tourId') tourId: number):  Promise<TourDate[]> {
    // Ваш код для получения дат тура по tourId
    return this.tourDateService.getTourDatesByTourId(tourId);
  }

  @Put(':dateId') // Добавляем метод для редактирования даты тура
  updateTourDate(@Param('dateId') dateId: number, @Body() updatedTourDate: Partial<TourDate>): Promise<TourDate> {
    return this.tourDateService.updateTourDate(dateId, updatedTourDate);
  }

  @Delete(':dateId') // Добавляем метод для удаления даты тура
  deleteTourDate(@Param('dateId') dateId: number): Promise<void> {
    return this.tourDateService.deleteTourDate(dateId);
  }


}

