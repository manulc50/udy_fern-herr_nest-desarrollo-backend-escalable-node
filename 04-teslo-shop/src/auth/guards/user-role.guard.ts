import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';

// Este Guard ha sido generado usando el comando "nest g|generate gu|guard auth/guards/userRole --no-spec" de Nest CLI.
// La opción "--no-spec" es para que no genere el archivo de pruebas correspondiente.

// Guard personalizado que verifica los roles del usuario autenticado para permitir o no ejecutar el método handler correspondiente.

@Injectable()
export class UserRoleGuard implements CanActivate {

  // Nota: Inyectamos aquí una instancia de tipo Reflector para poder obtener los datos de una Metadata dada su id.
  constructor(private readonly reflector: Reflector) {}
 
  // Si este método devuelve true, el Guard deja pasar. En caso contrario, es decir, si devuelve false o lanza una excepción, el Guard no deja pasar.
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Obtenemos los roles indicados en la Metadata con id META_ROLES.
    const validRoles: string [] = this.reflector.get(META_ROLES, context.getHandler());

    // Si no se ha definido una Metadata con los roles en el método handles, se considera que cualquier usuario autenticado puede acceder a dicho método.
    if(!validRoles || validRoles.length === 0)
      return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    // En caso de no existir el usuario autenticado, es un fallo del servidor porque debería existir.
    if(!user)
      throw new InternalServerErrorException('User not found (request');

    for(const role of user.roles) {
      if(validRoles.includes(role))
        return true;
    }

    throw new ForbiddenException(`User "${ user.fullname }" needs a valid role: [${ validRoles }]`);
  }
}
