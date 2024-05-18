import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

// Nota: Este Pipe personalizado ha sido creado con el comando de Nest CLI "nest g|generate pi|pipe common/pipes/parseMongoId --no-spec".
// La opción "--no-spec" es para que no genere el archivo de ruebas. De forma automática, Nest añade la palabra "Pipe" al final del nombre
// del Pipe que hemos indicado.

// Este Pipe personalizado se encarga de validar que el id que se recibe desde la url de la petición http es un id propio de MongoDB.
@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    if(!isValidObjectId(value))
      throw new BadRequestException(`${ value } is not a valid MongoId`);
    return value;
  }
}
