import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArendaStatus } from '../users/entities/arenda-status.entity';
import { TourDate } from '../users/entities/tour-date.entity';

@Injectable()
export class ArendaStatusService {
  constructor(
    @InjectRepository(ArendaStatus)
    private readonly arendaStatusRepository: Repository<ArendaStatus>,
    @InjectRepository(TourDate)
    private readonly tourDateRepository: Repository<TourDate>,
  ) {}

  // Метод для получения статуса аренды по определенной дате тура
  async getArendaStatusByTourDate(tourDateId: number): Promise<ArendaStatus[]> {
    // Используем arendaStatusRepository для поиска статуса аренды
    // в базе данных по заданной дате тура
    return this.arendaStatusRepository.find({
      where: { tourDate: { id: tourDateId } }, // Ищем по идентификатору даты тура
      relations: ['tourDate'], // Загружаем связанную сущность TourDate
    } as any); // Приводим к типу any из-за проблем с типами
  }

  // Метод для создания нового статуса аренды для указанной даты тура
  async createArendaStatus(tourDateId: number, arendaStatusData: Partial<ArendaStatus>): Promise<ArendaStatus> {
    // Поиск даты тура в базе данных по идентификатору
    const tourDate = await this.tourDateRepository.findOne({
        where: { date_id: tourDateId },
        relations: ['arendaStatus'],
    } as any);
     // Явно указываем тип

    // Проверяем, была ли найдена дата тура
    if (!tourDate) {
      // Если не найдена, выбрасываем исключение NotFoundException
      throw new NotFoundException(`TourDate with ID ${tourDateId} not found`);
    }

    // Создание нового объекта ArendaStatus с указанием связанной даты тура
    const newArendaStatus = this.arendaStatusRepository.create({
      ...arendaStatusData, // Копируем данные из переданного объекта
      tourDate: tourDate, // Устанавливаем связь с датой тура
    });

    // Сохранение нового статуса аренды в базе данных
    return this.arendaStatusRepository.save(newArendaStatus);
  }
}
