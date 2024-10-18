import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/infraestructure/users.module';
import { configService } from './shared/config/configService';
import { ProductsModule } from './products/infraestructure/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configService.get('HOST'),
      port: configService.get('PORT'),
      username: configService.get('USERDB'),
      password: configService.get('PASSWORD'),
      database: configService.get('DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}
