import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TourService } from './tour.service';
import { Tour } from '../users/entities/tour.entity';

@Controller('tours')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get()
  async getAllTours(): Promise<Tour[]> {
    try {
      const tours = await this.tourService.getAllTours();
      console.log('Returned tours:', tours);
      return tours;
    } catch (error) {
      console.error('Error in getAllTours:', error);
      throw error;
    }
  }


  @Get(':id')
  async getTourById(@Param('id') id: number) {
    return this.tourService.getTourById(id);
  }
  @Get('name-tour/:tour')
  async findTourName(@Param('tour') tour: string): Promise<Tour>{
  try{ 
    console.log('111');
    return await this.tourService.findTourName(tour);
  }catch(error){
    console.error('Произошла ошибка:', error.message);
  }

  }

  
  @Post()
  async createTour(@Body() tourData: Partial<Tour>) {
    return this.tourService.createTour(tourData);
  }

  @Put(':id')
  async updateTour(@Param('id') id: number, @Body() tourData: Partial<Tour>) {
    return this.tourService.updateTour(id, tourData);
  }

  @Delete(':id')
  async deleteTour(@Param('id') id: number) {
    return this.tourService.deleteTour(id);
  }
}