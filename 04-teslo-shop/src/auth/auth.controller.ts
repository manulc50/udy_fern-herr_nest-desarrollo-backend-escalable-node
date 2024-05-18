import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { IncomingHttpHeaders } from 'http';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';


// Este Decorador nos permite agrupar bajo un nombre los endpoints de un controlador.
@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // Usamo el Guard "AuthGuard" de Passport en este método handler o endpoint para que su acceso sea privado y requiera un token JWT válido.
  // El Decorador "@GetUser" es un Decorador personalizado que obtiene los datos del usuario autenticado de la petición http si no se le pasa ningún argumento de entrada, o bien,
  // obtiene el valor de una propiedad de ese usuario si se pasa el nombre de esa propiedad como argumento de entrada.
  // El Decorador "@RawHeaders" es un Decorador personalizado que obtiene las cabeceras de la propiedad "rawHeaders" de la petición http.
  // El Decorador "@Headers" es un Decorador de Nest que obtiene las cabeceras de la petición http(Es muy parecido a nuestro Decorador personalizado "@RawHeaders").
  @UseGuards(AuthGuard())
  @Get('private1')
  testingPrivateRoute1(@Req() request: Express.Request, @GetUser() user: User, @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[], @Headers() headers: IncomingHttpHeaders) {
    console.log({ user: request.user });

    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      userEmail,
      rawHeaders,
      headers
    };
  }

  // El Guard "UserRoleGuard" es un Guard personalizado que verifica los roles del usuario autenticado para permitir o no ejecutar el método handler correspondiente. 
  // Nota: "AuthGuard()" lleva paréntesis porque en realidad es una función que devuelve una instancia del Guard. Sin embargo, nuestro Guard
  // personalizado "UserRoleGuard" ya es directamente una instancia.
  @UseGuards(AuthGuard(), UserRoleGuard)
  // Establecemos una Metadata con id "roles" que contiene un array de roles. En este caso, dicha Metadata va a ser usada en nuestro Guard personalizado "UserRoleGuard".
  // Se comentda porque ahora este Metadata es devuelve por nuestro decorador personalizado "@RoleProtected". La idea es tener la definición de los roles válido en un único sitio(en el Decorador)
  // en vez de tenerlos en todos los métodos handler que requieran acceso por roles.
  //@SetMetadata('roles', ['admin', 'super-user'])
  @RoleProtected(ValidRoles.SUPER_USER, ValidRoles.ADMIN, ValidRoles.USER)
  @Get('private2')
  testingPrivateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user
    };
  }

  // Este Decorador "@Auth" es un Decorador personalizado que está compuesto por los Decoradores "@UseGuards" y "@RoleProtected". Es decir, las restricciones de este método handler, o endpoint,
  // son las mismas que en el método handler de arriba "testingPrivateRoute2" pero los Descoradores se han agrupado en un único Decorador.
  // En general, cuando usamos varios Decoradores, en vez de tener que usarlos en otros lugares, es buena idea agruparlos en un solo Decorador y usar solo ese Decorador donde se necesite.
  // Si no indicamos roles al Decorador "@Auth", sólo verifica que el usuario esté autenticado correctamente para acceder al método. En caso contrario, si indicamos algún role, además verifica
  // que el usuario autenticado tenga ese role para poder acceder al método. 
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
  @Get('private3')
  testingPrivateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user
    };
  }

  @Auth()
  @HttpCode(HttpStatus.OK)  
  @Post('refresh-token')
  refreshToken(@GetUser('id') id: string) {
    return this.authService.refreshToken(id);
  }

}
