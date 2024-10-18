import { Product } from "src/products/infraestructure/ports/mysql";
import { UserInterface } from "src/users/domain/entities/userI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user"})
export class User implements UserInterface {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false, length: 60, unique: true})
    email: string;
    @Column({nullable: false, length: 45, unique: true})
    username: string;
    @Column({nullable: false})
    passwordUser: string;
    @OneToMany(() => Product, (product) => product.id_user)
    id_product: number;
}