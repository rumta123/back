// create-moto.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMotoDto {
  @IsNotEmpty()
  @IsString()
//   moto_name: string;
  readonly equipment_name: string;

  // Добавьте другие поля, которые требуется заполнить при создании Moto
}


  
  // create-arenda-status.dto.ts
  export class CreateArendaStatusDto {
    readonly status_id: number;
    readonly is_busy: boolean;
    // Добавьте остальные поля в соответствии с вашей бизнес-логикой
  }