import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/shared/config/configService';
import { TokenService } from '../application/services/token.service';
import { TokenRepositoryImp } from './jwt/tokenRepository.imp';
import { PasswordHashRepositoryImpl } from './bcrypt/passworHash.imp';
import { PasswordHashService } from '../application/services/passwordHash.service';
import { SecurityGuard } from '../application/guards/security.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    SecurityGuard,
    TokenService,
    TokenRepositoryImp,
    PasswordHashService,
    PasswordHashRepositoryImpl,
  ],
  exports: [
    SecurityGuard,
    TokenService,
    TokenRepositoryImp,
    PasswordHashService,
    PasswordHashRepositoryImpl,
  ],
})
export class SecurityModule {}
