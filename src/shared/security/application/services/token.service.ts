import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenRepositoryImp } from '../../infraestructure/jwt/tokenRepository.imp';
import { TokenRepositoryI } from '../../domain/repository/token.repository';

@Injectable()
export class TokenService {
  constructor(
    @Inject(TokenRepositoryImp)
    private readonly _tokenRepository: TokenRepositoryI,
  ) {}

  async verifyToken(token: string) {
    try {
      const {
        iat: _,
        exp,
        ...userPayload
      } = await this._tokenRepository.decode(token);
      const currentDate = new Date();
      const expiresDate = new Date(exp);
      return {
        user: userPayload,
        isExpired: +expiresDate <= +currentDate / 1000,
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
