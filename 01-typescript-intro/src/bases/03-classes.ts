import axios from 'axios';
import { Move, PokeApiResponse } from '../interfaces/pokeapi-response.interface';

export class Pokemon {
    // Nota: Tanto en las propiedades como en los métodos, si no indicamos el nivel de acceso, por defecto son públicos.

    /*public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        console.log('constructor llamado');
    }*/

    // Forma simplificada
    // Nota: "readonly" permite establecer el valor de una propiedad una sola vez y después no se puede cambiar.
    constructor(
        public readonly id: number,
        public name: string,
        //public imageUrl: string
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
        const { data: { moves } } = await axios.get<PokeApiResponse>('https://pokeapi.co/api/v2/pokemon/4');
        console.log(moves);
        return moves;
    }

    // Nota: El acceso a un método getter desde una instancia de una clase es igual que el acceso a una propiedad pública. 
    get imageUrl(): string {
        return `http://pokemon.com/${ this.id }.jpg`;
    }
}

export const charmander = new Pokemon(4, 'Charmander');

console.log(charmander);
console.log(charmander.imageUrl);
charmander.scream();
//charmander.speak(); // Error ya que el método es privado
charmander.getMoves();