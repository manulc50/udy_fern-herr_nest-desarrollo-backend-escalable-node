
export const pokemonIds = [1, 20, 30, 34, 66];

//pokemonIds.push('abcsjf'); // Ésto es válido en JavaScript
pokemonIds.push(+'1'); // Usamos el operador '+' para convertir rápidamente un string en un número

console.log(pokemonIds)

interface Pokemon {
    id: number,
    name: string,
    age?: number // opcional
};

export const bulbasur: Pokemon = {
    id: 1,
    name: 'Bulbasur'
};

export const charmander: Pokemon = {
    id: 4,
    name: 'Charmander',
    age: 12
};

console.log(bulbasur);

export const pokemons: Pokemon[] = [];

pokemons.push(charmander, bulbasur);

console.log(pokemons);