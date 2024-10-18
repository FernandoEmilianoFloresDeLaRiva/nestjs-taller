import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from 'src/users/domain/entities/userI';
import { UserRepository } from 'src/users/domain/repository/user.repository';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDtoI, UpdateUserDtoI } from 'src/users/domain/dtoI';

@Injectable()
export class UserRepositoryImp implements UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(user: CreateUserDtoI): Promise<UserInterface> {
    try {
      const res = await this.userRepository.save(user);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteUser(id: number): Promise<any> {
    try {
      const res = await this.userRepository.delete(id);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(user: UpdateUserDtoI): Promise<UserInterface> {
    try {
      const res = await this.userRepository.save(user);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllUsers(): Promise<UserInterface[]> {
    try {
      const res = await this.userRepository.find();
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUserById(id: number): Promise<UserInterface> {
    try {
      const res = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getByEmail(email: string): Promise<UserInterface> {
    try {
      const res = await this.userRepository.findOne({
        where: {
          email,
        },
      });
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
}
