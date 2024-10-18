import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../services/token.service';

@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(
    @Inject(TokenService) private readonly _tokenService: TokenService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    let token = req.headers['authorization'];
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Autorizacion invalida');
    }
    token = token.substring(7);
    const manageToken = await this._tokenService.verifyToken(token);
    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token expired');
    }
    req.username = manageToken.user.username;
    return true;
  }
}
