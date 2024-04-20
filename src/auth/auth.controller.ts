import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';

import { LoginDto, tokenDto } from './auth.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() dto:LoginDto ) {
    return this.authService.login(dto);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() dto:LoginDto ) {
    return this.authService.register(dto);
  }
  @Post('sendemail')
  @UsePipes(new ValidationPipe())
  sendemail(@Body() dto:tokenDto ) {
    return this.authService.sendEmail(dto);
  }
}
