import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService] // Para que pueda ser inyectado en el módulo "seed"(módulo externo)
})
export class CarsModule {}
