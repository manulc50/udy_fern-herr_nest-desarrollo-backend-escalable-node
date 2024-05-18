import { ExecutionContext, InternalServerErrorException, createParamDecorator } from '@nestjs/common';

// Se trata de un Decorador personalizado que, si no recibe ningún argumento de entrada, obtiene y devuelve el usuario autenticado de la petición http.
// Y, si recibe un argumento de entrada, se trata de una propiedad del usuario autenticado y devuelve el valor de esa propiedad.

// La función "createParamDecorator" de Nest nos permite crear Decoradores personalizados. Recibe una función de callback con la
// implementación de nuestro Decorador. El argumento de entrada "data" de la función de callback representa los datos que pasamos
// al Decorador.
export const GetUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    // Tenemos esta propiedad "user" con los datos del usuario autenticado en la petición http gracias a la validación de nuestra estrategia "JwtStrategy".
    const { user } = req;

    // En caso de no existir el usuario autenticado, es un fallo del servidor porque debería existir.
    if(!user)
        throw new InternalServerErrorException('User not found (request');

    return !data ? user : user[data];
});