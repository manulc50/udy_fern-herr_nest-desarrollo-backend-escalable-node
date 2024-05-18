import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces';

// Este Decorador ha sido generado con el comando "nest g|generate d|decorator auth/decorators/roleProtected --no-spec" de Nest CLI.
// La opción "--no-spec" es para que no genere el archiv de pruebas correspondiente.

export const META_ROLES = 'roles';

export const RoleProtected = (...args: ValidRoles[]) => SetMetadata(META_ROLES, args);
