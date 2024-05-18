import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

// El decorador @UsePipes(aplica Pipes) podemos ponerlo a nivel de controlador(afecta a todos los métodos handler) o a nivel de método handler
// El Pipe ValidationPipe valida las validaciones indicadas en el Dto CreateCarDto
// Se comenta porque ahora se establece a nivel global para todos los controladores
//@UsePipes(ValidationPipe)
@Controller('cars')
export class CarsController {

    constructor(private readonly carService: CarsService) {}

    @Get() // Por defecto devuelve el código 200 en la respuesta http
    getAllCars() {
        return this.carService.findAll();
    }

    // ParseIntPipe es un Pipe que valida y parsea el string id que se recibe desde la url a un entero.
    // ParseUUIDPipe es un Pipe que valida y parsea el string id que se recibe desde la url a un UUID.
    // Si el string no representa el tipo de dato esperado, el Pipe generará una respuesta de tipo 400(Bad Request) automáticamente.
    // Nota: Si queremos usar la configuración por defecto de un Pipe, basta con pasar directamente la referencia. Sin embargo, si
    // necesitamos configurar algún Pipe, tenemos que pasar una nueva instancia del Pipe indicando la configuración.
    @Get(':id')
    //getCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) { // Configuramos el Pipe ParseUUIDPipe para que use la versión 4 de UUID
    getCarById(@Param('id', ParseUUIDPipe) id: string) { // Con la configuración por defecto del Pipe ParseUUIDPipe
        // El operado '+' convierte rápidamente un string en un entero. Por ej, si id fuera un string que representa un entero, podríamos usar "+id"
        return this.carService.findOneById(id);
    }

    // Nota: El decorador @Body puede parsear tanto datos que vienen en formato JSON como datos que vienen en formulario x-www-form-urlencoded. 
    // Se comenta porque ahora se establece a nivel de controlador
    //@UsePipes(ValidationPipe)
    @Post() // Por defecto devuelve el código 201 en la respuesta http
    createCar(@Body() createCarDto: CreateCarDto) {
        return this.carService.create(createCarDto);
    }

    @Patch('/:id') // Por defecto devuelve el código 200 en la respuesta http
    updateCar(@Param('id', ParseUUIDPipe) id: string, @Body() updateCarDto: UpdateCarDto) {
        return this.carService.update(id, updateCarDto);
    }

    // El decorador @HttpCode nos permite indicar el código de la respuesta http
    @HttpCode(204)
    @Delete('/:id') // Por defecto devuelve el código 200 en la respuesta http
    deleteCar(@Param('id', ParseUUIDPipe) id: string) {
        this.carService.delete(id);
    }
}
