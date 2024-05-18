import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from './../common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from './../common/dto/pagination.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonsService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokemonsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonsService.findOne(term);
  }

  // Nota: Tanto en el método handler "update" como en el método handler "remove", aunque no devuelven contenido, sí devuelven una Promesa
  // debido al uso de async-await y, por lo tanto, tenemos que devolverla.

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonsService.update(term, updatePokemonDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonsService.remove(id);
  }
}
