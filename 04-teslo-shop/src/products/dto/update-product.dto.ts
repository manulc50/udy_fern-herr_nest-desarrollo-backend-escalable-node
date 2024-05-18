//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger'; // Nota: Usamo el de Swagger para poder heredar las anotaciones de Swagger
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
