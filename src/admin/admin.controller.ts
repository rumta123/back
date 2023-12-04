import { Controller, Get, UseGuards, Req, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AdminService } from './admin.service';
import * as bcrypt from 'bcrypt';

import { Admin } from '../users/entities/admin.entity';
// @Controller('admin')
// export class AdminController {
//   
// }

@Controller('admin')
export class AdminController {

    @Get('profile')
    getProfile(@Req() req: Request): string {
        return 'This is your profile';
    }
    constructor(private readonly adminService: AdminService) { }

    @Post('register')
    async register(@Body() body: { login: string; password: string }): Promise<string> {
      try {
        // Check if the login is already taken
        const existingAdmin = await this.adminService.findByLogin(body.login);
        if (existingAdmin) {
          throw new BadRequestException('Login is already taken');
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(body.password, 10);
  
        // Create a new admin instance
        const newAdmin = new Admin();
        newAdmin.login = body.login;
        newAdmin.password = hashedPassword;
  
        // Save the new admin
        await this.adminService.create(newAdmin);
  
        return `Admin ${newAdmin.login} has been registered successfully.`;
      } catch (error) {
        console.error('Registration error:', error.message);
        throw new BadRequestException('Registration failed');
    }
    }

    @UseGuards(AuthGuard('local'))
    @Post('login') // Add this route for login
    async login(@Body() body: { login: string; password: string }): Promise<string> {
      try {
        const user = await this.adminService.validateUser(body.login, body.password);
        if (!user) {
          throw new BadRequestException('Invalid login or password');
        }
  
        // Here, you can return a JWT token or any other authentication response
        return `Welcome, ${user.login}!`;
      } catch (error) {
        console.error('Login error:', error.message);
        throw new BadRequestException('Login failed');
      }
    }
}
