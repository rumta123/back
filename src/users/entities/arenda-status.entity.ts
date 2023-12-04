// arenda-status.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { TourDate } from './tour-date.entity';
import { Moto } from './moto.entity';
// import { Tour } from './tour.entity';
import { Users } from './users.entity';
import { UserMotoArenda } from './user-moto-arenda.entity';

@Entity()
export class ArendaStatus {
  @PrimaryGeneratedColumn()
  status_id: number;

  @ManyToOne(() => TourDate, (tourDate) => tourDate.arendaStatus)
  tourDate: TourDate;

  // @ManyToOne(() => Moto, (moto) => moto.arendaStatus)
  // moto: Moto;

  // @ManyToOne(() => Tour, (tour) => tour.arendaStatus)
  // tour: Tour;

  @OneToMany(() => UserMotoArenda, (userMotoArenda) => userMotoArenda.arendaStatus)
  userMotoArendas: UserMotoArenda[];

  @ManyToOne(() => Users, (user) => user.arendaStatus)
  user: Users;

  @Column({ type: 'boolean', default: false })
  is_busy: boolean;

  @Column({ type: 'int', nullable: true })
  rental_days: number;

  @Column({ type: 'varchar', nullable: true })
  dogovor_po_turu: string | null | undefined;
  
  @Column({ type: 'varchar', nullable: true })
  dogovor_na_arendu: string | null | undefined;
  
  @Column({ type: 'varchar', nullable: true })
  description: string | null | undefined;


  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  rental_cost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_rental_cost: number;
}