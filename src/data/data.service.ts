// data.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Moto } from '../users/entities/moto.entity';
import { ArendaStatus } from '../users/entities/arenda-status.entity';
import { CreateMotoDto } from '../users/dto/create-moto.dto';
import { CreateArendaStatusDto } from '../users/dto/create-arenda-status.dto';

import { Repository, DeepPartial } from 'typeorm';
@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Moto)
    private readonly motoRepository: Repository<Moto>,
    @InjectRepository(ArendaStatus)
    private readonly arendaStatusRepository: Repository<ArendaStatus>,
  ) {}

  async createMoto(createMotoDto: CreateMotoDto): Promise<Moto> {
    return await this.motoRepository.save(this.motoRepository.create(createMotoDto));
  }
}