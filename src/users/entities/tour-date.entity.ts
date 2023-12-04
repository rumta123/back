// tour-date.entinity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Tour } from './tour.entity';
import { ArendaStatus } from './arenda-status.entity';

@Entity()
export class TourDate {
  @PrimaryGeneratedColumn()
  date_id: number;

  @Column({ type: 'date' })
  tour_date: Date;

  @OneToMany(() => TourDate, (tourDate) => tourDate.tour)
  tourDates: TourDate[];

  @ManyToOne(() => Tour, (tour) => tour.tourDates)
  tour: Tour;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  advance: number; // Аванс

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tourCost: number; // Общая сумма тура

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalTourCost: number; // Общая сумма тура

  @Column({ type: 'integer', default: 0 }) // Добавленное поле для общего количества мест
  totalSeats: number;

  @Column({ type: 'integer', default: 0 }) // Добавленное поле для общего количества мест
  freeSpots: number;

  @OneToMany(() => ArendaStatus, (arendaStatus) => arendaStatus.tourDate)
  arendaStatus: ArendaStatus[];

}

