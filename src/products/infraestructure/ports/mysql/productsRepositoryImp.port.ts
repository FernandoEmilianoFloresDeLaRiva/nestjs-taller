import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepositoryI } from 'src/products/domain/repository/products.repository';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDtoI, UpdateProductDTOI } from 'src/products/domain/dtoI';
import { ProductI } from 'src/products/domain/entities/productI';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepositoryImpl implements ProductsRepositoryI {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async createProduct(product: CreateProductDtoI): Promise<ProductI> {
    try {
      const res = await this.productRepository.save(product);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteProduct(id: number): Promise<any> {
    try {
      const res = await this.productRepository.delete(id);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateProduct(product: UpdateProductDTOI): Promise<ProductI> {
    try {
      const res = await this.productRepository.save(product);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllProducts(): Promise<ProductI[]> {
    try {
      const res = await this.productRepository.find();
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getProductsById(id: number): Promise<ProductI> {
    try {
      const res = await this.productRepository.findOne({
        where: {
          id,
        },
      });
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getProductsByUserId(id: number): Promise<ProductI[]> {
    try {
      const res = await this.productRepository.findBy({
        id_user: id,
      });
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
}
