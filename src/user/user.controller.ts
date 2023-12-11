import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ICreateUserRequest } from './interfaces/create-user-request';
import { ILoginUserRequest } from './interfaces/login-user-request';
import { IRegisterUserRequest } from './interfaces/register-user-request';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  loginUser(@Body() data: ILoginUserRequest) {
    return this.userService.login(data);
  }

  @Post('register')
  registerUser(@Body() data: IRegisterUserRequest) {
    return this.userService.register(data);
  }

  @Post('create')
  createUser(@Body() data: ICreateUserRequest) {
    return this.userService.create(data);
  }
}
