import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from ".";

@Entity({ name: 'product_images' }) // Es equivalente a usar la expresión "@Entity('product_images')"
export class ProductImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(
        () => Product,
        product => product.images,
        { onDelete: "CASCADE", orphanedRowAction: 'delete' }
    )
    product: Product;
}