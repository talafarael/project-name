import { Injectable } from '@nestjs/common';
import { RegistrDto } from './registr.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class RegistrService {
  constructor(private prisma: PrismaService) {}
  async create(dto: RegistrDto) {
 console.log(';fafa')
    const existingUser = await this.prisma.users.findFirst({
      where: {
        email: dto.email,
      },
    });
   
    if (existingUser) {
      throw new Error('Пользователь с данным email уже существует');
    }
    dto.password = await bcrypt.hash(dto.password, 7);
    return this.prisma.users.create({
      data: dto,
    });
  }
}
