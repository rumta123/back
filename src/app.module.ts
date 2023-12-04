import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ToursModule } from './tours/tours.module';
import { ArendaStatusModule } from './arenda-status/arenda-status.module';
import { TourDateModule } from './tour-date/tour-date.module';
import { MotoModule } from  './moto/moto.module';
import { UserMotoArendaModule } from './user-moto-arenda/user-moto-arenda.module'; // Добавляем эту строку
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    AdminModule,
    ToursModule,
    ArendaStatusModule,
    TourDateModule,
    MotoModule,
    UserMotoArendaModule
  ],
})
export class AppModule {}


