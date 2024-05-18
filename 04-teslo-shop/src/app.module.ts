import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

@Module({
  imports: [
    // Nota: Invocando la método "forRoot" del módulo "ConfigModule", la aplicación ya tiene en cuenta las variables de entorno personalizadas
    // definidas en el archivo .env. Debe invocarse antes de usar alguna de esas varibles de entorno.
    ConfigModule.forRoot(),
    // Configuramos el módulo TypeOrmModule con los datos de conexión a la base de datos(En este caso, una base de datos PostgreSQL).
    TypeOrmModule.forRoot({
      // Solo si en Producción usamos una base de datos que requiere conexión segura mediante SSL.
      ssl: process.env.STAGE === 'prod', // Forma simplificada de la expresión "process.env.STAGE === 'prod' ? true : false"
      extra: {
        ssl: process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      // Crea de forma automática las tablas correspondientes a las entidades en la base de datos.
      autoLoadEntities: true,
      // Sincroniza automáticamente los cambios realizados en las entidades con sus tablas correspondientes en la base de datos. No usar en Producción.
      synchronize: true
    }),
    // Módulo que nos permite servir contenido estático públicamente(Hay que instalar previamente la dependencia "@nestjs/serve-static").
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    ProductsModule,
    CommonModule,
    SeedModule,
    FilesModule,
    AuthModule,
    MessagesWsModule
  ]
})
export class AppModule {}
