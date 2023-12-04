import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ArendaStatusService } from './arenda-status.service';
import { ArendaStatus } from '../users/entities/arenda-status.entity';

@Controller('arenda-status')
export class ArendaStatusController {
  constructor(private readonly arendaStatusService: ArendaStatusService) {}

  // Контроллер для получения статуса аренды по определенной дате тура
  @Get('by-tour-date/:tourDateId')
  async getArendaStatusByTourDate(@Param('tourDateId') tourDateId: number): Promise<ArendaStatus[]> {
    return this.arendaStatusService.getArendaStatusByTourDate(tourDateId);
  }

  // Контроллер для создания нового статуса аренды для указанной даты тура
  @Post(':tourDateId')
  async createArendaStatus(
    @Param('tourDateId') tourDateId: number,
    @Body() arendaStatusData: Partial<ArendaStatus>,
  ): Promise<ArendaStatus> {
    return this.arendaStatusService.createArendaStatus(tourDateId, arendaStatusData);
  }

  // Другие методы, такие как update и delete, могут быть добавлены по вашему усмотрению.
}
