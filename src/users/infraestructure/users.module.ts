import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from '../application/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './ports/mysql/user.entity';
import { UserRepositoryImp } from './ports/mysql/userRepositoryImp.port';
import { SecurityModule } from 'src/shared/security/infraestructure/security.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SecurityModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepositoryImp],
})
export class UsersModule {}
