import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { ICreateUserRequest } from './interfaces/create-user-request';
import { ILoginUserRequest } from './interfaces/login-user-request';
import * as bcryptjs from 'bcryptjs';
import { IRegisterUserRequest } from './interfaces/register-user-request';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(data: ILoginUserRequest) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: data.email },
        select: ['userId', 'name', 'email', 'password'],
      });
      if (!user) throw new Error('User not found');
      if (bcryptjs.compareSync(data.password, user.password)) {
        return { success: true, data: { item: user } };
      } else {
        throw new Error('Invalid password or email');
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async register(data: IRegisterUserRequest) {
    try {
      const password = bcryptjs.hashSync(data.password, 10);
      const createdUser = await this.userRepository.save({ ...data, password });
      return { success: true, data: { item: createdUser } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(data: ICreateUserRequest) {
    try {
      const password = bcryptjs.hashSync(data.password, 10);
      const createdUser = await this.userRepository.save({ ...data, password });
      return { success: true, data: { item: createdUser } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
