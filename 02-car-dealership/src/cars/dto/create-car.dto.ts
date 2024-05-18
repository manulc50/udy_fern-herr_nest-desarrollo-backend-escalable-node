import { IsString } from "class-validator";

// Nota: Los Dtos deben ser clases en vez de interfaces para poder realizar validaciones.
export class CreateCarDto {

    // La propiedad message nos permite personalizar el mensaje de error de la validación
    //@IsString({ message: 'The brand must be a cool string' })
    @IsString()
    readonly brand: string;

    @IsString()
    //@MinLength(3) // Valida que debe ser un string de longitud mínima 3 caracteres 
    readonly model: string;
}