import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from '../application/services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductsRepositoryImpl } from './ports/mysql';
import { SecurityModule } from 'src/shared/security/infraestructure/security.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), SecurityModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepositoryImpl],
})
export class ProductsModule {}
