import { MyDecorator } from "../decorators/my-decorator.decorator";

// Un Decorador es una función que tiene acceso a la definición de una clase y puede modificarla(Por ejemplo, reduciendo o ampliando funcionalidades de ella).
@MyDecorator()
export class Pokemon {

    constructor(
        public readonly id: number,
        public name: string
    ) {}

    scream() {
        console.log(`${ this.name.toUpperCase() }!!`);
    }

    speak() {
        console.log(`${ this.name }, ${ this.name }!`);
    }
}

export const charmander = new Pokemon(4, 'Charmander');

charmander.scream();
charmander.speak();