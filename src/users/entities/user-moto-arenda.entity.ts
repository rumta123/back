// user-moto-arenda.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Moto } from './moto.entity';
import { ArendaStatus } from './arenda-status.entity';
import { TourDate } from './tour-date.entity';
import { Tour } from './tour.entity';
import { Users } from './users.entity';

@Entity()
export class UserMotoArenda {
  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => Moto, (moto) => moto.userMotoArendas)
  moto: Moto;


  @ManyToOne(() => ArendaStatus, (arendaStatus) => arendaStatus.userMotoArendas)
  arendaStatus: ArendaStatus;

}