import { Deprecated } from "../decorators/deprecated.decorator";

export class Pokemon {

    constructor(
        public readonly id: number,
        public name: string
    ) {}

    scream() {
        console.log(`${ this.name.toUpperCase() }!!`);
    }

    @Deprecated('Most use speak2 method instead')
    speak() {
        console.log(`${ this.name }, ${ this.name }!`);
    }

    speak2() {
        console.log(`${ this.name }, ${ this.name }!!!`);
    }
}

export const charmander = new Pokemon(4, 'Charmander');

charmander.speak();