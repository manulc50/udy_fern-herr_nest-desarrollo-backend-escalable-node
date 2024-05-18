import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';

// PartialType permite heredar las propiedades de un Dto haciendo que éstas sean opcionales en la clase donde se hereda
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
