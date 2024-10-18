import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsRepositoryI } from 'src/products/domain/repository/products.repository';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/infraestructure/ports/class-validator';
import { ProductsRepositoryImpl } from 'src/products/infraestructure/ports/mysql';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(ProductsRepositoryImpl)
    private readonly _productsRepository: ProductsRepositoryI,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      return await this._productsRepository.createProduct(createProductDto);
    } catch (error) {
      throw new HttpException(
        error,
        error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this._productsRepository.getAllProducts();
    } catch (error) {
      throw new HttpException(
        error,
        error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      return (await this._productsRepository.getProductsById(id)) ?? null;
    } catch (error) {
      throw new HttpException(
        error,
        error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUserId(id: number) {
    try {
      return await this._productsRepository.getProductsByUserId(id);
    } catch (error) {
      throw new HttpException(
        error,
        error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const isExisting = await this._productsRepository.getProductsById(id);
      if (!isExisting) {
        throw new NotFoundException('Producto no encontrado');
      }
      const reqProduct = {
        id: id,
        ...updateProductDto,
      };
      return await this._productsRepository.updateProduct(reqProduct);
    } catch (error) {
      throw new HttpException(
        error,
        error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const res = await this._productsRepository.deleteProduct(id);
      if (res?.affected <= 0) {
        throw new NotFoundException('Producto no encontrado');
      }
    } catch (error) {
      throw new HttpException(
        error,
        error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
