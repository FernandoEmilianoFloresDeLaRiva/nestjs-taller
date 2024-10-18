import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PasswordHashService } from 'src/shared/security/application/services/passwordHash.service';
import { TokenRepositoryI } from 'src/shared/security/domain/repository/token.repository';
import { TokenRepositoryImp } from 'src/shared/security/infraestructure/jwt/tokenRepository.imp';
import { UserRepository } from 'src/users/domain/repository/user.repository';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/users/infraestructure/ports/class-validator';
import { UserRepositoryImp } from 'src/users/infraestructure/ports/mysql/userRepositoryImp.port';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepositoryImp) private readonly _userRepository: UserRepository,
    @Inject(PasswordHashService)
    private readonly _passwordHashService: PasswordHashService,
    @Inject(TokenRepositoryImp)
    private readonly _tokenRepository: TokenRepositoryI,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const password = createUserDto.passwordUser;
      const passwordHash =
        await this._passwordHashService.hashedPassword(password);
      const reqUserDto: CreateUserDto = {
        ...createUserDto,
        passwordUser: passwordHash,
      };
      const res = await this._userRepository.createUser(reqUserDto);
      return res;
    } catch (error) {
      throw new HttpException(
        error,
        error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this._userRepository.getAllUsers();
    } catch (error) {
      throw new HttpException(
        error,
        error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      return (await this._userRepository.getUserById(id)) ?? null;
    } catch (error) {
      throw new HttpException(
        error,
        error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const isExisting = await this._userRepository.getUserById(id);
      if (!isExisting) {
        throw new NotFoundException('Usuario no encontrado');
      }
      const password = updateUserDto?.passwordUser ?? '';
      if (!(password === '')) {
        const hashedPassword =
          await this._passwordHashService.hashedPassword(password);
        const reqUser = {
          ...updateUserDto,
          id: id,
          passwordUser: hashedPassword,
        };
        return await this._userRepository.updateUser(reqUser);
      }
    } catch (error) {
      throw new HttpException(
        error,
        error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const res = await this._userRepository.deleteUser(id);
      if (res?.affected <= 0) {
        throw new NotFoundException('Usuario no encontrado');
      }
    } catch (error) {
      throw new HttpException(
        error,
        error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(userReq: UpdateUserDto) {
    try {
      const { email, passwordUser } = userReq;
      const user = await this._userRepository.getByEmail(email);
      if (!user) {
        throw new NotAcceptableException('Credenciales invalidas');
      }
      const isPasswordValid = await this._passwordHashService.comparePassword(
        passwordUser,
        user.passwordUser,
      );
      if (!isPasswordValid) {
        throw new NotAcceptableException('Credenciales invalidas');
      }
      const { passwordUser: _, ...userRest } = user;
      return {
        user: userRest,
        token: await this._tokenRepository.sign(userRest),
      };
    } catch (error) {
      throw new HttpException(
        error,
        error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
