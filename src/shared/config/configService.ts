import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: ['.env'],
  isGlobal: true,
});

export const configService = new ConfigService();
