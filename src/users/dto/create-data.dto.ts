// create-data.dto.ts

export class CreateDataDto {
    readonly motoDto: {
      id: number;
      equipment_name: string;
    };
  
    readonly arendaStatusDto: {
      motoId: number; // соответствует "motoId" в вашей базе данных
      arendaStatusStatusId: number; // соответствует "arendaStatusStatusId" в вашей базе данных
  
      status_id: number;
      is_busy: boolean;
      rental_days: number;
      dogovor_po_turu: string;
      dogovor_na_arendu: string;
      description: string;
      rental_cost: number;
      total_rental_cost: number;
      tourDateDateId: number; // соответствует "tourDateDateId" в вашей базе данных
      userId: number; // соответствует "userId" в вашей базе данных
      // Добавьте остальные поля в соответствии с вашей бизнес-логикой
    };
  }