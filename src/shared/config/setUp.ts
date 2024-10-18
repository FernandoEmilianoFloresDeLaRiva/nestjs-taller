import { INestApplication, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/infraestructure/ports/class-validator';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/users/infraestructure/ports/class-validator';
import { CustomExceptionFilter } from './customException.filter';

export const setUp = (app: INestApplication): INestApplication => {
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(
    //filter for errors
    new CustomExceptionFilter(),
  );
  //swagger
  const config = new DocumentBuilder()
    .setTitle('API con NestJS')
    .setDescription('Taller de NestJS impartido por Fernando Flores')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingresa el valor del token, sin la palabra clave "Bearer"',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const configOptions: SwaggerDocumentOptions = {
    extraModels: [
      CreateUserDto,
      UpdateUserDto,
      CreateProductDto,
      UpdateProductDto,
    ],
  };
  const document = SwaggerModule.createDocument(app, config, configOptions);
  SwaggerModule.setup('swagger', app, document);
  return app;
};
