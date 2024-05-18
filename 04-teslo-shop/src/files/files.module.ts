import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

// Nota: Este módulo y sus componentes(controlador, servicio, etc...) han sido genereados de forma automática con el comando
// de Nest CLI "nest g|generate res|resource files --no-spec". La opción "--no-spec" es para que no genere el archivo de pruebas.

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [ConfigModule]
})
export class FilesModule {}
