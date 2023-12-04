// tour.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TourDate } from './tour-date.entity';
import { ArendaStatus } from './arenda-status.entity';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  tour_id: number;

  @Column({ type: 'text', nullable: true })
  tour_name: string;

  @Column({ type: 'text', nullable: true })
  tour_description: string;

  @OneToMany(() => TourDate, (tourDate) => tourDate.tour, { onDelete: 'CASCADE' })
  tourDates: TourDate[];

  @OneToMany(() => ArendaStatus, (arendaStatus) => arendaStatus.tourDate)
  arendaStatus: ArendaStatus[];
}