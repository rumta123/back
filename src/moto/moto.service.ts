// moto.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Moto } from '../users/entities/moto.entity';

@Injectable()
export class MotoService {
  constructor(
    @InjectRepository(Moto)
    private readonly motoRepository: Repository<Moto>,
  ) {}

  async createMoto(motoData: Partial<Moto>): Promise<Moto> {
    const newMoto = this.motoRepository.create(motoData);
    return this.motoRepository.save(newMoto);
  }

  async getAllMotos(): Promise<Moto[]> {
    return this.motoRepository.find();
  }

  async getMotoById(id: number): Promise<Moto> {
    try {
      const moto = await this.motoRepository.findOne({ where: { id: id } });
      if (!moto) {
        throw new NotFoundException(`Moto with ID ${id} not found`);
      }
      return moto;
    } catch (error) {
      throw new NotFoundException(`Moto with ID ${id} not found`);
    }
  }

  async updateMoto(id: number, motoData: Partial<Moto>): Promise<Moto> {
    await this.getMotoById(id); // Check if the moto with the given ID exists
    await this.motoRepository.update(id, motoData);
    return this.getMotoById(id);
  }


  async deleteMoto(id: number): Promise<void> {
    try {
      const existingTour = await this.getMotoById(id);
      await this.motoRepository.remove(existingTour);
    } catch (error) {
      console.error('Error deleting moto:', error);
      throw error; // Это позволит отобразить ошибку в ответе сервера
    }
  }
// вывести свободные мотоциклы на дату тура 

// async getFreeMotosOnTourDate(tourDateId: number): Promise<Moto[]> {
//   const freeMotos = await this.motoRepository
//     .createQueryBuilder('moto')
//      .leftJoinAndSelect('moto.userMotoArendas', 'userMotoArendas')
//     .leftJoinAndSelect('arendaStatus.tourDate', 'tourDate')
//     .where('tourDate.id = :tourDateId', { tourDateId })
//     // .andWhere('arendaStatus.is_busy = false')
//     .getMany();

//   return freeMotos;
// }
 
// async getFreeMotosOnTourDate(tourDateId: number): Promise<Moto[]> {
//   const freeMotos = await this.motoRepository
//     .createQueryBuilder('moto')
//     .leftJoinAndSelect('moto.userMotoArendas', 'userMotoArendas')
//     .leftJoinAndSelect('moto.arendaStatus', 'arendaStatus') // Исправлено здесь
//     .leftJoinAndSelect('arendaStatus.tourDate', 'tourDate')
//     .where('tourDate.id = :tourDateId', { tourDateId })
//     .andWhere('arendaStatus.is_busy = false')
//     .getMany();

//   return freeMotos;
// }

}
