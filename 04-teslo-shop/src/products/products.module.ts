import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductImage } from './entities';
import { AuthModule } from '../auth/auth.module';

// Nota: Este módulo y sus componentes(controlador, servicio, etc...) han sido genereados de forma automática con el comando
// de Nest CLI "nest g|generate res|resource products --no-spec". La opción "--no-spec" es para que no genere el archivo de pruebas.

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    // Tenemos que indicar al módulo TypeOrm cuáles son las entidades que tiene que manejar
    TypeOrmModule.forFeature([Product, ProductImage]),
    AuthModule
  ],
  exports: [ProductsService]
})
export class ProductsModule {}
