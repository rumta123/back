// user-moto-arenda.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { UserMotoArendaService } from './user-moto-arenda.service';
import { UserMotoArenda } from '../users/entities/user-moto-arenda.entity';
import { FindOneOptions } from 'typeorm';
@Controller('user-moto-arenda')
export class UserMotoArendaController {
  constructor(private readonly userMotoArendaService: UserMotoArendaService) { }

  @Get()
  getAllMotos() {
    return this.userMotoArendaService.getAllMotos();
  }

  
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserMotoArenda> {
    return this.userMotoArendaService.findOne(id);
  }
  

  // @Get(':userId/:motoId')
  // getMotoById(@Param('userId') userId: number, @Param('motoId') motoId: number) {
  //   return this.userMotoArendaService.getMotoById(userId, motoId);
  // }


// вот может из-за этого косяк?
  @Get(':id/:userId')
  async getMotoById1(
    @Param('id') id: number,
    @Param('userId') userId: number,
  ): Promise<UserMotoArenda[]> {
    return this.userMotoArendaService.getMotoById1(id, userId);
  }

  // @Get(':userId/all-data')
  // async findAllDataByUserId(@Param('userId') userId: number) {
  //   return this.userMotoArendaService.findAllDataByUserId(userId);
  // }

//   @Controller('user-moto-arenda')
// export class UserMotoArendaController {
//   constructor(private readonly userMotoArendaService: UserMotoArendaService) {}

//   @Post()
//   createUserMotoArenda(@Body() data: Partial<UserMotoArendaEntity>) {
//     return this.userMotoArendaService.createUserMotoArenda(data);
//   }
// }

  @Post()
  create(@Body() userMotoArendaData: Partial<UserMotoArenda>): Promise<UserMotoArenda> {
    return this.userMotoArendaService.create(userMotoArendaData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userMotoArendaData: Partial<UserMotoArenda>): Promise<UserMotoArenda> {
    return this.userMotoArendaService.update(+id, userMotoArendaData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userMotoArendaService.remove(+id);
  }
}
