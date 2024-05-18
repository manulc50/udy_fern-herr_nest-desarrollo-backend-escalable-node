import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from './../products/products.module';
import { AuthModule } from '../auth/auth.module';

// Nota: Este módulo y sus componentes(controlador, servicio, etc...) han sido genereados de forma automática con el comando
// de Nest CLI "nest g|generate res|resource seed --no-spec". La opción "--no-spec" es para que no genere el archivo de pruebas.

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ProductsModule, AuthModule]
})
export class SeedModule {}
