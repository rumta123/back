// tour-date.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Tour } from '../users/entities/tour.entity';
import { TourDate } from '../users/entities/tour-date.entity';


@Injectable()
export class TourDateService {

    constructor(
    @InjectRepository(TourDate)
    private readonly tourDateRepository: Repository<TourDate>,
  ) {}

  async createTourDate(tourDateData: Partial<TourDate>): Promise<TourDate> {
    const newTourDate = this.tourDateRepository.create(tourDateData);
    return this.tourDateRepository.save(newTourDate);
  }

  async getTourDatesByTourId(tourId: number): Promise<TourDate[]> {
    return this.tourDateRepository.find({
      where: { tour: { tour_id: tourId } },
    });
  }

  async updateTourDate(dateId: number, updatedTourDate: Partial<TourDate>): Promise<TourDate> {
    try {
      // Attempt to update the tour date
      const result: UpdateResult = await this.tourDateRepository.update(dateId, updatedTourDate);
  
      if (result.affected === 0) {
        throw new NotFoundException(`Tour date with id ${dateId} not found`);
      }
  
      // Fetch the updated entity
      return this.tourDateRepository.findOneOrFail({ where: { date_id: dateId } });
    } catch (error) {
      throw new NotFoundException(`Tour date with id ${dateId} not found`);
    }
  }



  async deleteTourDate(dateId: number): Promise<void> {
    const result: DeleteResult = await this.tourDateRepository.delete(dateId);

    if (result.affected === 0) {
      throw new NotFoundException('Tour date not found');
    }
  }

 

}
