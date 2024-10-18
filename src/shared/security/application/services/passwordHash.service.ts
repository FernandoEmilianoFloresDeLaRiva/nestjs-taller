import { Inject, Injectable } from '@nestjs/common';
import { PasswordHashRepositoryImpl } from '../../infraestructure/bcrypt/passworHash.imp';
import { PasswordHashRepositoryI } from '../../domain/repository/passwordHash.repository';

@Injectable()
export class PasswordHashService {
  constructor(
    @Inject(PasswordHashRepositoryImpl)
    private readonly _passwordRepository: PasswordHashRepositoryI,
  ) {}

  async hashedPassword(password: string): Promise<string> {
    try {
      const res = await this._passwordRepository.hashedPassword(password);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    try {
      const res = await this._passwordRepository.comparePassword(
        password,
        passwordHash,
      );
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
}
