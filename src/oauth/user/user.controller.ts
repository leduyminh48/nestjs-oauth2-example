import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterUserDto } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() registerDto: RegisterUserDto) {
    return this.userService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.authenticate(loginDto.email, loginDto.password);
  }
}
