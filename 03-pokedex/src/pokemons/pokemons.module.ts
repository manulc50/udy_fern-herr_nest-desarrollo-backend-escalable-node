import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

// Nota: Este módulo y sus componentes(controlador, servicio, etc...) han sido genereados de forma automática con el comando
// de Nest CLI "nest g|generate res|resource brands --no-spec". La opción "--no-spec" es para que no genere el archivo de pruebas.

@Module({
  controllers: [PokemonsController],
  providers: [PokemonsService],
  imports: [
    ConfigModule,
    // Importamos este módulo de Mongoose para registrar nuestra clase entidad, que representa un documento de MongoDB, y nuestro esquema.
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema
      }
    ])
  ],
  exports: [MongooseModule]
})
export class PokemonsModule {}
