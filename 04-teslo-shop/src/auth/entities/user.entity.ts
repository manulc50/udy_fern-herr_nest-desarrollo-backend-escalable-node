import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities";

@Entity({ name: 'users' }) // Equivalente a usar la expresión "@Entity('users')"
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    fullname: string;

    @Column('text', { unique: true })
    email: string;

    // Ponemos la propiedad "select" en false para que la contraseña no aparezca en los resultados de las consultas.
    @Column({ type: 'text', select: false })
    password: string;

    @Column({ type: 'bool', default: true })
    isActive: boolean;

    @Column({ type: 'text',  array: true, default: ['user'] })
    roles: string[];

    @OneToMany(
        () => Product,
        product => product.user
    )
    products: Product[];

    @BeforeInsert() @BeforeUpdate()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }
}
