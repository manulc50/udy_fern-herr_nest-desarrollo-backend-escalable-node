import { IsOptional, IsString } from "class-validator";

// Nota: Los Dtos deben ser clases en vez de interfaces para poder realizar validaciones.
export class UpdateCarDto {

    @IsString()
    @IsOptional()
    readonly brand?: string;

    @IsString()
    @IsOptional()
    readonly model?: string;
}