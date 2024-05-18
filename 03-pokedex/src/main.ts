import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Este método nos permite configurar un prefijo global para todos los controladores de la aplicación.
  app.setGlobalPrefix('api/v2');
  // Establecemos el Pipe ValidationPipe a nivel global para todos los controladores de la aplicación
  // La propiedad whitelist puesta a true hace que se eliminen o se ignoren aquellas propiedades que se envian en el cuerpo de la petición http que no
  // están definidas en el Dto correspondiente. Si además establecemos la propiedad forbidNonWhitelisted en true, se generará una respuesta http
  // con estado 400(Bad Request) en caso de que en el cuerpo de la petición http haya propiedades que no están definidas en el Dto correspondiente.
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    // Transforma de forma automática los strings recibidos en las peticiones http en los correspondientes tipos de las propiedades de los Dtos.
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  await app.listen(process.env.PORT);
  console.log(`App running on port ${ process.env.PORT }`);
}
bootstrap();
