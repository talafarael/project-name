import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { PrismaService } from 'src/prisma.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const generateAccessToken = (id) => {
  const playold = {
    id,
  };
  return jwt.sign(playold, process.env.SECRET, { expiresIn: '24h' });
};
@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}
  async login(dto: LoginDto) {
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
    const token = generateAccessToken(User.id);
    return {
    token
    };
  }
}
