import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/users.entity';
import { DateService } from '../date/date.service'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly dateService: DateService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.fio = createUserDto.fio;
    user.DateBirth = this.dateService.parseDate(createUserDto.DateBirth);
    user.driverLicenseDate = this.dateService.parseDate(createUserDto.driverLicenseDate);
    user.passportVydan = this.dateService.parseDate(createUserDto.passportVydan);
    user.passportNumber = createUserDto.passportNumber; // Убедитесь, что это значение передается и не равно null

    // Другие поля и логика, если есть

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      // Обработка ошибок сохранения в базу данных
      throw new Error(`Unable to create user: ${error.message}`);
    }
  }

  // create(createUserDto: CreateUserDto): Promise<Users> {
  //   const user = new Users();
  //   user.fio = createUserDto.firstName;
  //   return this.usersRepository.save(user);
  // }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }
  // async findAllFio(): Promise<Users[]> {
  //   return this.usersRepository.find();
  // }
  findOne(id: number): Promise<Users> {
    return this.usersRepository.findOneBy({ id: id });
  }

  // async findFio(startingChars: string): Promise<Users[]> {
  //   return this.usersRepository.find({ where: { fio: Like(`${startingChars}%`) } });
  // }

  async findFio(startingChars: string): Promise<Users[]> {
    return this.usersRepository.find({
      where: { fio: ILike(`${startingChars}%`) },
      order: { fio: 'ASC' } // Сортировка результатов по фамилии по возрастанию, если необходимо
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}