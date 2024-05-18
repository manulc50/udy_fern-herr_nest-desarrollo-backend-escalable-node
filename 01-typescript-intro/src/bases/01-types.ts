
// Nota: Un módulo se ejecuta cuando es importado en otro sitio por primera vez

export let name = 'Manuel';
export const age: number = 35;
export const isValid: boolean = true;

console.log({ isValid });

name = 'Melissa';
//name = true; // Error porque "name" es de tipo string
//name = 123; // Error porque "name" es de tipo string

export const templateString = `Esto es un string
multilínea
que puede tener
" dobles o
' simples,
inyectar valores: ${ name },
expresiones: ${ 1 + 1 },
números: ${ age },
booleanos: ${ isValid }`;

console.log(templateString);