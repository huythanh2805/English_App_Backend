import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LogoutDto } from './dto/logout.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const {deviceId} = body
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user, deviceId);
  }
  @Post('register')
  async register(@Body() body: RegisterDto) {
    await this.authService.checkExistUser(body.email);
    return this.authService.register(body.email, body.password);
  }
  @Post('logout')
  async logout(@Body() body: LogoutDto) {
    return this.authService.logout(body);
  }
}
