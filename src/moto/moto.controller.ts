// moto.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { MotoService } from './moto.service';
import { Moto } from '../users/entities/moto.entity'; // Убедитесь, что это импортировано правильно.


@Controller('moto')

export class MotoController {
  constructor(
    private readonly motoService: MotoService,
    
  ) { }


  @Post()
  createMoto(@Body() motoData: Partial<Moto>) {
    return this.motoService.createMoto(motoData);
  }

  @Get()
  getAllMotos() {
    return this.motoService.getAllMotos();
  }

  @Get(':id')
  getMotoById(@Param('id') id: number) {
    return this.motoService.getMotoById(id);
  }
// список свободных мотоциклов
  // @Get('free-on-tour-date/:tourDateId')
  // getFreeMotosOnTourDate(@Param('tourDateId') tourDateId: number) {
  //   return this.motoService.getFreeMotosOnTourDate(tourDateId);
  // }


  @Put(':id')
  updateMoto(@Param('id') id: number, @Body() motoData: Partial<Moto>) {
    return this.motoService.updateMoto(id, motoData);
  }

 
  @Delete(':id')
  async deleteMoto(@Param('id') id: number) {
    try {
      // Получаем мотоцикл по ID
      const moto = await this.motoService.getMotoById(id);

      // Удаляем мотоцикл
      await this.motoService.deleteMoto(id);

      return moto; // Возвращаем удаленный мотоцикл (это можно изменить в соответствии с вашими потребностями)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Moto with ID ${id} not found`);
      }
      throw error; // Если возникла другая ошибка, выбрасываем ее
    }
  }
}