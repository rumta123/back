import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMotoArenda } from '../users/entities/user-moto-arenda.entity';

@Injectable()
export class UserMotoArendaService {
  constructor(
    @InjectRepository(UserMotoArenda)
    private userMotoArendaRepository: Repository<UserMotoArenda>,
  ) {}

  async getAllMotos(): Promise<UserMotoArenda[]> {
    return await this.userMotoArendaRepository.find({
      relations: [ 'moto', 'arendaStatus', 'arendaStatus.user', 'arendaStatus.tourDate'],
    });
  }

  async findOne(id: number): Promise<UserMotoArenda> {
    return this.userMotoArendaRepository.findOne({ where: { id } });
  }

 
   // добавление в базы данных
  
   async createUserMotoArenda(userMotoArendaData: Partial<UserMotoArenda>): Promise<UserMotoArenda> {
    try {
        // Convert the partial entity to a fully defined entity
        const newUserMotoArenda = this.userMotoArendaRepository.create(userMotoArendaData);

        // Save the entity (assuming this generates and sets the id automatically)
        const createdUserMotoArenda = await this.userMotoArendaRepository.save(newUserMotoArenda);

        // Fetch the saved entity with relations
        const userMotoArendaWithRelations = await this.userMotoArendaRepository.findOne({
          where: { id: createdUserMotoArenda.id },
          relations: ['moto', 'arendaStatus', 'arendaStatus.user', 'arendaStatus.tourDate'],
      });

        return userMotoArendaWithRelations;
    } catch (error) {
        console.error('Error creating user moto arenda:', error);
        throw new Error('Failed to create user moto arenda.');
    }
}
// конец



  async getMotoById1(id: number, userId: number): Promise<UserMotoArenda[]> {
    return this.userMotoArendaRepository
      .createQueryBuilder('userMotoArenda')
      .innerJoinAndSelect('userMotoArenda.moto', 'moto')
      .where('userMotoArenda.id = :id', { id })
      .andWhere('userMotoArenda.user.id = :userId', { userId })
      .getMany();
  }


  async findAll(): Promise<UserMotoArenda[]> {
    console.log('Executing findAll method');
    return this.userMotoArendaRepository.find();
  }

 
  async create(userMotoArendaData: Partial<UserMotoArenda>): Promise<UserMotoArenda> {
    console.log('Executing create method');
    const newUserMotoArenda = this.userMotoArendaRepository.create(userMotoArendaData);
    return this.userMotoArendaRepository.save(newUserMotoArenda);
  }

  async update(id: number, userMotoArendaData: Partial<UserMotoArenda>): Promise<UserMotoArenda> {
    console.log(`Executing update method with id: ${id}`);
    await this.userMotoArendaRepository.update(id, userMotoArendaData);
    return this.userMotoArendaRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    console.log(`Executing remove method with id: ${id}`);
    await this.userMotoArendaRepository.delete(id);
  }
}
