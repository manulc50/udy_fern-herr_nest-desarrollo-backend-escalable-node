import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

// PartialType permite heredar las propiedades de un Dto haciendo que éstas sean opcionales en la clase donde se hereda
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
