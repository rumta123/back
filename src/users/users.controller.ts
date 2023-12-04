// users.controller.ts
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
    Query,
  } from '@nestjs/common';
  import { CreateUserDto } from './dto/create-user.dto';
  import { Users } from './entities/users.entity';
  import { UsersService } from './users.service';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    
    
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<Users> {
      return this.usersService.create(createUserDto);
     
    }
  
    @Get()
    findAll(): Promise<Users[]> {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Users> {
      return this.usersService.findOne(id);
    }

    // @Get('fio')
    // findAllFio() : Promise<Users[]> {
    //   return this.usersService.findAllFio();
    // }
    

    @Get('fio/:fio')
    findFio(@Param('fio') fio: string): Promise<Users[]> {
      console.log('111');
      return this.usersService.findFio(fio);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.usersService.remove(id);
    }
  }