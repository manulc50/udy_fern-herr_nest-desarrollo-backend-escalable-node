import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';


// Este Decorador nos permite agrupar bajo un nombre los endpoints de un controlador.
@ApiTags('Files')
@Controller('files')
export class FilesController {

  constructor(
    private readonly filesService: FilesService,
    private readonly confifService: ConfigService
  ) {}

  // Usamos un interceptor de tipo FileInterceptor para indicar el nombre del campo que se utilizará para enviar el archivo en el cuerpo de la petición http y
  // para validar dicho archivo mediante la invocación a nuestra función "fileFilter".
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    //limits: { fileSize: 1000 }, // Podemos indicar el tamaño máximo del archivo que se acepta en bytes
    storage: diskStorage({ // Indicamos que el almacenamiento de los archivos va a ser en disco
      destination: './static/products', // Indicamos la ruta donde se almacenarán los archivos subidos
      // Por defecto, los archivos se suben con un nombre único generado aleatoriamente y sin extensión.
      // Por esta razón, aquí indicamos la referencia a nuestra función "fileNamer" para que sea invocada y proporcione un nombre con extensión al archivo subido.
      filename: fileNamer
    })
  }))
  @Post('products')
  // El decorador @UploadedFile se encarga de recibir y parsear el archivo que se envía en el cuerpo de la petición http al objeto de tipo "Express.Multer.File".
  // Nota: Multer es una librería que nos permite subir archivos y ya viene integrada en Nest(Si usamos TypeScript, tenemos que instalar, como librería de desarrollo, los tipos de Multer mediante "npm i -D @types/multer"). 
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    // Si el archivo no es aceptado por nuestro interceptor, no llegará hasta este controlador y, por lo tanto, el objeto "file" no estará definido.
    if(!file)
      throw new BadRequestException('Make sure that the file is an image');

    const sercureUrl = `${ this.confifService.get('HOST_API') }/api/files/products/${ file.filename }`;

    return { sercureUrl };
  }

  // El decorador @Res() inyecta la respuesta http en el argumento de entrada y, por lo tanto, nos permite acceder a ella.
  // Nota: Si tenemos un argumento de entrada que utiliza el decorador @Res, significa que tenemos que gestionar la respuesta de la petición http manualmente.
  @Get('products/:imageName')
  findProductImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const imagePath = this.filesService.getStaticProductImage(imageName);
    res.sendFile(imagePath);
  }

}
