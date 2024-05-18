import { join } from 'path'; // Es de Node. Nota: Normalmente las importaciones que son de Node se colocan al principio.
import { Module } from '@nestjs/common'; // Nota: Después van las de Nest
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PokemonsModule } from './pokemons/pokemons.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    // Módulo necesario para que se creen las variables de entorno, indicadas en el archivo .env, en el objeto "process.env". Hay que instalar previamente la dependecia "@nestjs/config".
    // Nota: Debe colocarse en este array antes de donde se use alguna de las variables de entorno.
    // Al array de la propiedad "load" agregamos nuestra función de configuración de variables de entorno "envConfiguration". De esta forma, dicha función de invocará creándose un objeto
    // con propiedades establecidas a los valores de nuestras variables de entorno personalizadas.
    ConfigModule.forRoot({ load: [EnvConfiguration], validationSchema: JoiValidationSchema }),
    // Para servir contenido estático en Nest, tenemos que instalar previamente la dependencia "@nestjs/serve-static" y, a continuación,
    // importar este módulo.
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    // Indicamos el módulo de Mongoose para Nest y la url de nuestra base de datos para que se haga la conexión.
    MongooseModule.forRoot(process.env.MONGODB_URL),
    PokemonsModule,
    CommonModule,
    SeedModule
  ],
})
export class AppModule {}
