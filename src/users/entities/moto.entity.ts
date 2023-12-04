// moto.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { UserMotoArenda } from './user-moto-arenda.entity';
import { ArendaStatus } from './arenda-status.entity';
@Entity()
export class Moto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  equipment_name: string;

  // @ManyToOne(() => ArendaStatus, (arendaStatus) => arendaStatus.userMotoArendas) // Здесь добавлено
  // arendaStatus: ArendaStatus;

  @OneToMany(() => UserMotoArenda, (userMotoArenda) => userMotoArenda.moto)
  userMotoArendas: UserMotoArenda[];
}
