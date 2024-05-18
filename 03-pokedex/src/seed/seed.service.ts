import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from './../pokemons/entities/pokemon.entity';
import { AxiosAdapter } from './../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly httpClient: AxiosAdapter
  ) {}

  // Nota: A partir de la versión 18 de NodeJS, se encuentra disponible fetch para porder realizar peticiones http.
  // Si usamos una versión anterior de NodeJS, tenemos que instalar otro cliente http como axios.

  async executeSeed() {
    await this.pokemonModel.deleteMany();

    const data = await this.httpClient.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=650");
    //const insertPromisesArray = []; // Primera forma de insertar varios registros a la vez usando un array de Promesas
    const pokemonsToInsert: { name: string, no: number }[] = []; // Segunda forma de insertar varios registro a la vez usando un array de Pokemons(Forma recomendada)

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      //insertPromisesArray.push(this.pokemonModel.create({ name, no })); // Primera forma de insertar varios registros a la vez usando un array de Promesas
      pokemonsToInsert.push({ name, no }); // Segunda forma de insertar varios registro a la vez usando un array de Pokemons(Forma recomendada)
    });

    // En vez de insertar cada pokemon de uno en uno, los insertamos todos a la vez y, de esta forma, es más eficiente, sobre todo si son muchos.
    //await Promise.all(insertPromisesArray); // Primera forma de insertar varios registros a la vez usando un array de Promesas
    await this.pokemonModel.insertMany(pokemonsToInsert); // Segunda forma de insertar varios registro a la vez usando un array de Pokemons(Forma recomendada)

    return "Seed executed";
  }
}
