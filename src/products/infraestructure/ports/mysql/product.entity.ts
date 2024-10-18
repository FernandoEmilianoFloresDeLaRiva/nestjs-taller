import { ProductI } from "src/products/domain/entities/productI";
import { User } from "src/users/infraestructure/ports/mysql/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : "products"})
export class Product implements ProductI {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    name: string;
    @Column({nullable: false, type : 'decimal'})    
    price: number;
    @Column({nullable: false, length : 150})
    description: string;
    @ManyToOne(() => User, (user) => user.id_product)
    @Column({nullable: false,})
    @JoinColumn({ name: 'id_user' })
    id_user: number;
}