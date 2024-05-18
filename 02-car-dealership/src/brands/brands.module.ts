import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';

// Nota: Este módulo y sus componentes(controlador, servicio, etc...) han sido genereados de forma automática con el comando
// de Nest CLI "nest g|generate res|resource brands --no-spec". La opción "--no-spec" es para que no genere el archivo de pruebas.

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService] // Para que pueda ser inyectado en el módulo "seed"(módulo externo)
})
export class BrandsModule {}
