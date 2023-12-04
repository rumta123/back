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


  
  

// В вашем UserMotoArendaService
// async createUserMotoArenda(userMotoArendaData: Partial<UserMotoArenda>): Promise<UserMotoArenda> {
//   const newUserMotoArenda = this.userMotoArendaRepository.create(userMotoArendaData);
//   const createdUserMotoArenda = await this.userMotoArendaRepository.save(newUserMotoArenda);

//   // Загрузите созданную сущность с отношениями, используя where
//   const userMotoArendaWithRelations = await this.userMotoArendaRepository
//     .createQueryBuilder('userMotoArenda')
//     .leftJoinAndSelect('userMotoArenda.moto', 'moto')
//     .leftJoinAndSelect('userMotoArenda.arendaStatus', 'arendaStatus')
//     .leftJoinAndSelect('arendaStatus.user', 'user')
//     .leftJoinAndSelect('arendaStatus.tourDate', 'tourDate')
//     .where('userMotoArenda.id = :id', { id: createdUserMotoArenda.id })
//     .getOne();

//   return userMotoArendaWithRelations;
// }



  // async findAllDataByUserId(id: number, userId: number): Promise<UserMotoArenda[]> {
  //   return this.userMotoArendaRepository.find({
  //     where: { id, user: { id: userId } },
  //     relations: ['user', 'moto'],
  //   });
  // }
  async findOne(id: number): Promise<UserMotoArenda> {
    return this.userMotoArendaRepository.findOne({ where: { id } });
  }

 
  



  async getMotoById1(id: number, userId: number): Promise<UserMotoArenda[]> {
    return this.userMotoArendaRepository
      .createQueryBuilder('userMotoArenda')
      .innerJoinAndSelect('userMotoArenda.moto', 'moto')
      .where('userMotoArenda.id = :id', { id })
      .andWhere('userMotoArenda.user.id = :userId', { userId })
      .getMany();
  }

  // async getMotoById(userId: number, motoId: number): Promise<UserMotoArenda> {
  //   return this.userMotoArendaRepository.findOne({
  //     where: { user: { id: userId }, moto: { id: motoId } },
  //   });
  // }

  // async getMotoById1(id: number, userId: number): Promise<UserMotoArenda[]> {
  //   return this.userMotoArendaRepository
  //     .createQueryBuilder('userMotoArenda')
  //     .innerJoinAndSelect('userMotoArenda.moto', 'moto')
  //     .where('userMotoArenda.id = :id', { id })
  //     .andWhere('userMotoArenda.user.id = :userId', { userId })
  //     .select([
  //       // 'userMotoArenda.id',
  //       // 'userMotoArenda.is_rented',
  //       'moto.id',
  //       'moto.equipment_name',  // Добавьте свойства, которые вы хотите включить
  //     ])
  //     .getMany();
  // }
  async findAll(): Promise<UserMotoArenda[]> {
    console.log('Executing findAll method');
    return this.userMotoArendaRepository.find();
  }

  // async findOne(id: number): Promise<UserMotoArenda> {
  //   console.log(`Executing findOne method with id: ${id}`);
  //   return this.userMotoArendaRepository.findOne({ where: { id } });
  // }

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
