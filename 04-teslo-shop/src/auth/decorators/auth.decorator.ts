import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ValidRoles } from "../interfaces";
import { RoleProtected } from "./role-protected.decorator";
import { UserRoleGuard } from "../guards/user-role.guard";

// Este Decorador personalizado es una composición o agrupador de otros Decoradores.

export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        // Establecemos una Metadata con id "roles" que contiene un array de roles. En este caso, dicha Metadata va a ser usada en nuestro Guard personalizado "UserRoleGuard".
        // Se comentda porque ahora este Metadata es devuelve por nuestro decorador personalizado "@RoleProtected". La idea es tener la definición de los roles válido en un único sitio(en el Decorador)
        // en vez de tenerlos en todos los métodos handler que requieran acceso por roles.
        //SetMetadata('roles', ['admin', 'super-user']),
        RoleProtected(...roles),
        // El Guard "UserRoleGuard" es un Guard personalizado que verifica los roles del usuario autenticado para permitir o no ejecutar el método handler correspondiente. 
        // Nota: "AuthGuard()" lleva paréntesis porque en realidad es una función que devuelve una instancia del Guard. Sin embargo, nuestro Guard
        // personalizado "UserRoleGuard" ya es directamente una instancia.
        UseGuards(AuthGuard(), UserRoleGuard)
    );
}