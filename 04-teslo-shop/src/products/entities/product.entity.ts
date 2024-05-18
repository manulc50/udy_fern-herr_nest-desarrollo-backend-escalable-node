import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./";
import { User } from "../../auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

// Este decorador hace que esta clase sea una entidad y se mapeará con una tabla de la base de datos.
// Por defecto utiliza el nombre de la clase entidad en minúscula para el nombre de la tabla en la base de datos.
@Entity('products') // Es equivalente a usar la expresión "@Entity({ name: 'products' })"
export class Product {

    @ApiProperty({
        example: '470efedf-2366-42d3-b9f7-382cfaf819f5',
        description: 'Product ID',
        uniqueItems: true
    
    })
    // Este decorador indica que esta propiedad se corresponde con la clave primaria. Por defecto, generára valores numéricos autoincrementales de forma automática.
    // Si configuramos el decorador con "uuid", se generarán UUID's en vez de valores numéricos.
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product Title',
        uniqueItems: true 
    })
    // Nota: En Nest junto con TypeORM, es obligatorio indicar este decorador @Column para que la propiedad quede reflejada en la tabla correspondiente de la base de datos.
    // En este caso, usamos este decorador para indicar el tipo de dato del campo asociado a esta propiedad en la base de datos y, también, indicamos que sus valores
    // van a ser únicos. Si no indicamos el tipo de dato, se infiere automáticamente.
    @Column('text', { unique: true })
    title: string;

    @ApiProperty({
        example: '0',
        description: 'Product Price' 
    })
    // Nota: El tipo "number" no es soportado por las bases de datos PostgreSQL.
    // En este caso, usamos este decorador para indicar el tipo de dato del campo asociado a esta propiedad en la base de datos y, también, indicamos el valor por defecto
    // del campo en caso de que no se establezca.
    @Column('float', { default: 0 })
    price: number;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        description: 'Product Description',
        default: null
    })
    // En este caso, usamos este decorador para indicar el tipo de dato del campo asociado a esta propiedad en la base de datos y, también, indicamos que el valor de este campo
    // puede ser nulo.
    @Column({ type: 'text',  nullable: true }) // Es equivalente a la expresión "@Column('text', { nullable: true })"
    description: string;

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'Product Slug -  for SEO',
        uniqueItems: true 
    })
    @Column({ type: 'text', unique: true }) // Es equivalente a la expresión "@Column('text', { unique: true })"
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product Stock',
        default: 0
    })
    @Column('int', { default: 0 })
    stock: number;

    @ApiProperty({
        example: ['M', 'XL', 'XXL'],
        description: 'Product Sizes'
    })
    @Column('text', { array: true })
    sizes: string[];

    @ApiProperty({
        example: 'women',
        description: 'Product Gender'
    })
    // En este caso, no indicamos el tipo de dato y, por lo tanto, se infiere.
    @Column()
    gender: string;

    @ApiProperty()
    @Column('text', { array: true, default: [] })
    tags: string[];

    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        productImage => productImage.product,
        { cascade: true, eager: true })
    images: ProductImage[];

    @ApiProperty()
    @ManyToOne(
        () => User,
        user => user.products,
        { eager: true }
    )
    user: User;

    @BeforeUpdate()
    @BeforeInsert()
    checkSlugBeforeInsert() {
        if(!this.slug)
            this.slug = this.title;
        this.slug = this.slug.toLowerCase().replaceAll(' ', '_').replaceAll('\'','');
    }

}
