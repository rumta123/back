// users.entitry.ts
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ArendaStatus } from './arenda-status.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fio: string;

  @Column({ type: 'date', nullable: true })
  DateBirth: Date | null;

  @Column({ nullable: true, default: null })
  passportSeries: string | null;

  @Column({ type: 'bigint', nullable: true })
  passportNumber: string;

  @Column({ nullable: true, default: null })
  passportKemVydan: string | null;

  @Column({ type: 'date', nullable: true })
  passportVydan: Date | null;

  @Column({ nullable: true, default: null })
  passportKodP: string | null;

  @Column({ nullable: true, default: null })
  driverLicense: string | null;

  @Column({ type: 'date', nullable: true })
  driverLicenseDate: Date | null;


  @Column({ type: 'bigint', nullable: true })
  phone: string;


  @OneToMany(() => ArendaStatus, (arendaStatus) => arendaStatus.user)
  arendaStatus: ArendaStatus[];

  @Column({ default: true })
  isActive: boolean;
}