import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// Se trata de un Decorador personalizado que obtiene las cabeceras de la propiedad "rawHeaders" de la petición http.

// La función "createParamDecorator" de Nest nos permite crear Decoradores personalizados. Recibe una función de callback con la
// implementación de nuestro Decorador. El argumento de entrada "data" de la función de callback representa los datos que pasamos
// al Decorador.

export const RawHeaders = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.rawHeaders;
});