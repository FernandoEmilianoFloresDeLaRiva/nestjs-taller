import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { configService } from './shared/config/configService';
import { setUp } from './shared/config/setUp';

async function bootstrap() {
  const logger = new Logger('main-app');
  const port = configService.get('API_PORT');
  let app = await NestFactory.create(AppModule);
  app = setUp(app);
  await app.listen(port);
  logger.log(`Starting app on port ${port}`);
}

bootstrap();
