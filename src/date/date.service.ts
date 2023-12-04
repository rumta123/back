// date.service.ts
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
// parseDate(dateString: string): Date {
//     // Реализуйте логику для преобразования строки в объект Date
//     // Например, можно использовать date-fns или встроенные функции JavaScript
//     return new Date(dateString);
//   }

// Теперь у вас есть formatDateToISO для форматирования даты в строку
export class DateService {
  formatDateToISO(date: Date): string {
    return format(date, 'yyyy-MM-dd');
  }
//   parseDate для преобразования строки обратно в объект Date
  parseDate(dateString: string): Date {
    // В зависимости от формата, вы можете использовать parseISO или другие методы из date-fns
    // Например, если формат такой, как 'yyyy-MM-dd', вы можете использовать parseISO(dateString)
    return new Date(dateString);
  }
}
