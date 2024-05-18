import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
    // Se comenta porque ahora los datos se cargan desde el módulo "seed"
    /*private readonly cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        }
    ];*/
    private cars: Car[] = [];

    // Si no se indica otra cosa, por defecto el método es público
    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);

        // NotFoundException es una de las excepciones predefinidas de Nest.
        // Nest se encarga de manejar dichas excepciones y de generar respuestas http acordes a cada excepción.
        if(!car)
            throw new NotFoundException(`Car with id '${ id }' not found`);

        return car;
    }

    create(createCarDto: CreateCarDto) {
        const car: Car = { id: uuid(), ...createCarDto };
        this.cars.push(car);
        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        const car: Car = this.findOneById(id);
        Object.assign(car, updateCarDto);
        return car;
    }

    delete(id: string) {
        const index = this.cars.findIndex(car => car.id === id);
        if(index === -1)
            throw new NotFoundException(`Car with id '${ id }' not found`);
        this.cars.splice(index, 1);
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }
}
