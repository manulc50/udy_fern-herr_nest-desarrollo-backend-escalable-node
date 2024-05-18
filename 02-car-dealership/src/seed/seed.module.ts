import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CarsModule } from './../cars/cars.module';
import { BrandsModule } from './../brands/brands.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  // Para poder inyectar y usar los servicios "CarsService" y "BrandsService" de los módulo "CarsModule" y "BrandsModule" respectivamente.
  imports: [CarsModule, BrandsModule]
})
export class SeedModule {}
