import { CreateProductDtoI, UpdateProductDTOI } from "../dtoI";
import { ProductI } from "../entities/productI";

export interface ProductsRepositoryI {
    createProduct(product : CreateProductDtoI) : Promise<ProductI>;
    deleteProduct(id : number) : Promise<any>;
    updateProduct(product : UpdateProductDTOI) : Promise<ProductI>;
    getAllProducts() : Promise<ProductI[]>;
    getProductsById(id : number) : Promise<ProductI>;
    getProductsByUserId(id : number) : Promise<ProductI[]>;
}