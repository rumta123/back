// tours/tour.service.ts
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from '../users/entities/tour.entity';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
  ) {}

  async getAllTours(): Promise<Tour[]> {
    try {
      return await this.tourRepository.find();
    } catch (error) {
      console.error('Error in getAllTours:', error);
      throw error; // или вернуть пустой массив или другое значение по умолчанию
    }
  }

  async findTourName(tour: string): Promise<Tour> {
    return await this.tourRepository.findOne({ where: { tour_name: tour } });
  }
  async getTourById(id: number): Promise<Tour> {
    try {
      const tour = await this.tourRepository.findOne({ where: { tour_id: id } });
      if (!tour) {
        throw new NotFoundException(`Tour with ID ${id} not found`);
      }
      return tour;
    } catch (error) {
      throw new NotFoundException(`Tour with ID ${id} not found`);
    }
  }

  async createTour(tourData: Partial<Tour>): Promise<Tour> {
    const tour = this.tourRepository.create(tourData);
    return this.tourRepository.save(tour);
  }

  async updateTour(id: number, tourData: Partial<Tour>): Promise<Tour> {
    // Найти тур в базе данных по идентификатору
    const tourToUpdate = await this.getTourById(id);

    if (!tourToUpdate) {
      // Если тур не найден, вы можете бросить ошибку или вернуть null
      throw new NotFoundException(`Tour with id ${id} not found`);
    }

    // Обновить данные тура с использованием данных из tourData
    this.tourRepository.merge(tourToUpdate, tourData);

    // Сохранить обновленный тур в базе данных
    return this.tourRepository.save(tourToUpdate);
  }


//   async updateTour(id: number, tourData: Partial<Tour>): Promise<Tour> {
//     const existingTour = await this.getTourById(id);
//     this.tourRepository.merge(existingTour, tourData);
//     return this.tourRepository.save(existingTour);
//   }

  async deleteTour(id: number): Promise<void> {
    const existingTour = await this.getTourById(id);
    await this.tourRepository.remove(existingTour);
  }
}