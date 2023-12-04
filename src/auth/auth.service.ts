// auth.service.ts
import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { Admin } from '../users/entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly adminService: AdminService) {}

  async validateAdmin(login: string, password: string): Promise<Admin | null> {
    const admin = await this.adminService.findByLogin(login);
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    }
    return null;
  }
}
