import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model, isValidObjectId } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from './../common/dto/pagination.dto';

@Injectable()
export class PokemonsService {

  // @InjectModel es un decorador que nos permite inyectar modelos.
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      return await this.pokemonModel.create({ ...createPokemonDto, name: createPokemonDto.name.toLowerCase() });
    }
    catch(error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.configService.get<number>('defaultLimit'), offset = 0 } = paginationDto;
    return await this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 }) // 1 -> De forma ascendente
      .select('-__v') // Eliminamos la propiedad "__v" de la respuesta
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if(!isNaN(+term))
      pokemon = await this.pokemonModel.findOne({ no: term });
    else if(isValidObjectId(term))
      pokemon = await this.pokemonModel.findById(term);
    else
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });

    if(!pokemon)
      throw new NotFoundException(`Pokemon with id, name or no '${ term }' not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon: Pokemon = await this.findOne(term);
    try {
      await pokemon.updateOne({
        ...updatePokemonDto,
        // Si establecemos "undefined", la propiedad es ignorada y no se actualiza. Sin embargo, si ponemos "null", la propiedad se actualiza con null.
        name: updatePokemonDto.name ? updatePokemonDto.name.toLowerCase() : undefined
      });
    }
    catch(error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if(deletedCount === 0)
      throw new NotFoundException(`Pokemon with id'${ id }' not found`);
  }

  private handleExceptions(error: any) {
    // Significa que ha detectado datos duplicados en propiedades con valores únicos.
    if(error.code === 11000)
      throw new BadRequestException(`Pokemon already exists in DB: ${ JSON.stringify(error.keyValue) }`);
    console.error(error);
    throw new InternalServerErrorException("The operation failed - Check server logs");
  }
}
