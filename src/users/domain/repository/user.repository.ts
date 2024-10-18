import { CreateUserDtoI, UpdateUserDtoI } from "../dtoI";
import { UserInterface } from "../entities/userI";

export interface UserRepository {
    createUser(user : CreateUserDtoI) : Promise<UserInterface>;
    deleteUser(id : number) : Promise<any>;
    updateUser(user : UpdateUserDtoI) : Promise<UserInterface>;
    getAllUsers() : Promise<UserInterface[]>;
    getUserById(id : number) : Promise<UserInterface>;
    getByEmail(email : string) : Promise<UserInterface>;
}