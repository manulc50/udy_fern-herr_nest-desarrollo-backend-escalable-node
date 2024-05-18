
export class NewPokemon {

    constructor(
        public readonly id: number,
        public name: string
    ) {}

    scream() {
        console.log('NO QUIERO!!');
    }

    speak() {
        console.log('NO QUIERO HABLAR!');
    }
}

export const MyDecorator = () => {
    return (target: Function) => {
        //console.log(target); // Muestra la estructura o definición de la clase donde se aplica el Decorador
        return NewPokemon; // Reemplaza la estructura de la clase donde se aplica el Decorador por la estructura de la clase "NewPokemon".
    }
};