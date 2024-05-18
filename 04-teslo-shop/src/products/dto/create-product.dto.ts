import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNumber, IsOptional,
         IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        description: 'Product Title',
        uniqueItems: true,
        minLength: 1
    })
    @IsString() @MinLength(1)
    title: string;

    @ApiProperty({ required: false })
    @IsOptional() @IsNumber() @IsPositive()
    price?: number;

    @ApiProperty()
    @IsOptional() @IsString()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional() @IsString()
    slug?: string;

    @ApiProperty({ required: false })
    // Nota: @IsNumber admite números decimales, sin embargo, @IsInt solo admite números enteros.
    @IsOptional() @IsInt() @IsPositive()
    stock?: number;

    @ApiProperty()
    // Cada elemento del array tiene que ser un string.
    @IsString({ each: true }) @IsArray()
    sizes: string[];

    @ApiProperty()
    // Tiene que ser un string que sea uno de estos valores.
    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;

    @ApiProperty({ required: false })
    @IsOptional() @IsString({ each: true }) @IsArray()
    tags?: string[];

    @ApiProperty({ required: false })
    @IsOptional() @IsString({ each: true }) @IsArray()
    images?: string[];
}
