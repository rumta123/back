
// admin.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../users/entities/admin.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async validateUser(login: string, password: string): Promise<Admin | null> {
    const user = await this.findByLogin(login);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  
  async findByLogin(login: string): Promise<Admin | undefined> {
    try {
      const admin = await this.adminRepository.findOne({ where: { login } });
      if (admin) {
        this.logger.debug(`Found admin with login: ${login}`);
      } else {
        this.logger.debug(`No admin found with login: ${login}`);
      }
      return admin;
    } catch (error) {
      this.logger.error(`Error finding admin by login: ${error.message}`);
      throw error;
    }
  }

  async create(admin: Admin): Promise<Admin> {
    try {
      const newAdmin = await this.adminRepository.save(admin);
      this.logger.debug(`Admin created: ${JSON.stringify(newAdmin)}`);
      return newAdmin;
    } catch (error) {
      this.logger.error(`Error creating admin: ${error.message}`);
      throw error;
    }
  }
}
