import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {

    @ApiProperty({
        description: 'Number of rows per page',
        default: 10,
        required: false
    })
    @IsOptional() @IsPositive()
    // Transforma el string del query que nos llega en la url a un número entero.
    // Es equivalente a establecer la propiedad "enableImplicitConversions" a true en el objeto de configuración del Pipe ValidationPipe(ver archivo "main.ts" del proyecto "03-pokedex").
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        description: 'Number of skiped rows',
        default: 0,
        required: false
    })
    @IsOptional() @Min(0)
    @Type(() => Number)
    offset?: number;
}