// create-arenda-status.dto.ts

import { IsNotEmpty, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateArendaStatusDto {
  @IsNotEmpty()
  @IsBoolean()
  is_busy: boolean;

  @IsNotEmpty()
  @IsNumber()
  rental_days: number;

  // Добавьте другие поля, которые требуется заполнить при создании ArendaStatus

  // Необязательные поля можно пометить как @IsOptional()
  @IsOptional()
  description: string;

  @IsOptional()
  rental_cost: number;

  tourDateDateId:number;
  readonly moto: {
    id: number; // или любой другой тип, соответствующий типу поля id в вашей сущности Moto
  };
  // и так далее
}


