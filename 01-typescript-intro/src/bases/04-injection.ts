import { Move, PokeApiResponse } from '../interfaces/pokeapi-response.interface';
import { PokeApiAxiosAdapater } from '../api/pokeapi-axios.adapter';
import { PokeApiFetchAdapter } from '../api/pokeapi-fetch-adapter';
import { HttpAdapter } from '../interfaces/htttp-adapter.interface';

export class Pokemon {

    constructor(
        public readonly id: number,
        public name: string,
        private readonly httpClient: HttpAdapter
    ) {
        console.log('constructo llamado');
    }

    scream() {
        console.log(this.name.toUpperCase() + '!!!');
        this.speak();
    }

    private speak() {
        console.log(`${ this.name }, ${ this.name }`);
    }

    async getMoves(): Promise<Move[]> {
        // Usamos doble desestructuración de objetos.
        //const { data: { moves } } = await axios.get<PokeApiResponse>('https://pokeapi.co/api/v2/pokemon/4');
        const { moves }  = await this.httpClient.get<PokeApiResponse>('https://pokeapi.co/api/v2/pokemon/4');
        console.log(moves);
        return moves;
    }

    // Nota: El acceso a un método getter desde una instancia de una clase es igual que el acceso a una propiedad pública. 
    get imageUrl(): string {
        return `http://pokemon.com/${ this.id }.jpg`;
    }
}

// Podemos usar cualquiera de estas implementaciones en la clase Pokemos gracias al principio de Sustitución de LisKov(uso de interfaces).
//const pokeApiFetchAdapter = new PokeApiFetchAdapter();
const pokeApiAxiosAdapter = new PokeApiAxiosAdapater();

export const charmander = new Pokemon(4, 'Charmander', pokeApiAxiosAdapter);
//export const charmander = new Pokemon(4, 'Charmander', pokeApiFetchAdapter);

charmander.getMoves();