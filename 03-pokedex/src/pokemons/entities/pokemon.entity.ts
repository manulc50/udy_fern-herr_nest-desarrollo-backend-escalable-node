import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
    //id: string // Lo proporciona MongoDB

    // Configuramos esta propiedad para que sus valores sean únicos y, además, creamos un índice sobre ella.
    @Prop({ unique: true, index: true })
    name: string;

    @Prop({ unique: true, index: true })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);