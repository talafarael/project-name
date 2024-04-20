import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { generateAccessToken } from 'middleware/generateAccessToken';
import { LoginDto, RegisterDto, tokenDto } from './auth.dto';
import verifyToken from 'middleware/verifyToken';



@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto:RegisterDto) {
    const User = await this.prisma.users.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (!User) {
      throw new Error('Пользователь с данным email не существует');
    }
    const validPassword = bcrypt.compareSync(dto.password, User.password);
    if (!validPassword) {
      throw new Error('не верный пароль');
    }
    // '365d'
    const token = generateAccessToken(User.id, '1h');
    return {
    token
    };
  }


  async register(dto: LoginDto) {
    console.log(';fafa');
    const existingUser = await this.prisma.users.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new Error('Пользователь с данным email уже существует');
    }
    dto.password = await bcrypt.hash(dto.password, 7);
    
    const createdUser =await this.prisma.users.create({
      data: dto,
    });
    const token = generateAccessToken(createdUser.id,'1h');
    return {
      token
      };
  }
  async sendEmail(dto:tokenDto){
    const {user, id} = await verifyToken(dto.token)
  }
}