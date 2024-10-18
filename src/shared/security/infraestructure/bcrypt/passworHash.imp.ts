import { configService } from 'src/shared/config/configService';
import { PasswordHashRepositoryI } from '../../domain/repository/passwordHash.repository';
import { Injectable } from '@nestjs/common';
import {hashSync, compareSync} from 'bcrypt';

@Injectable()
export class PasswordHashRepositoryImpl implements PasswordHashRepositoryI {
  private readonly salts = parseInt(configService.get('BCRYPT_JUMPS')) ?? 10;
  async hashedPassword(password: string): Promise<string> {
    try {
      const res = await hashSync(password, this.salts);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      const res = await compareSync(password, hashedPassword);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
}
