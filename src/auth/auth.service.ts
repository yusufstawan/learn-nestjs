import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { jwt_config } from 'src/config/jwt_config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  /**
   * Register a new user
   * @param data
   * @returns
   */
  async register(data: RegisterDto) {
    const checkUser = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (checkUser) {
      throw new HttpException('User sudah terdaftar', HttpStatus.FOUND);
    }

    data.password = await hash(data.password, 12);
    const createUser = await this.prisma.users.create({
      data,
    });

    if (createUser) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Register Berhasil',
      };
    }
  }

  /**
   * Login user
   * @param data
   * @returns
   */
  async login(data: LoginDto) {
    const checkUser = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!checkUser) {
      throw new HttpException('User tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await compare(data.password, checkUser.password);
    if (checkPassword) {
      const accessToken = this.generateJWT({
        sub: checkUser.id,
        name: checkUser.name,
        email: checkUser.email,
      });
      return {
        statusCode: HttpStatus.OK,
        accessToken: accessToken,
        message: 'Login Berhasil',
      };
    } else {
      throw new HttpException(
        'Email atau password tidak sesuai',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * Find user by id
   * @param user_id
   */
  async profile(user_id: number) {
    const dataUser = await this.prisma.users.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });
    if (dataUser) {
      return {
        statusCode: HttpStatus.OK,
        data: dataUser,
      };
    }

    throw new HttpException('User tidak ditemukan', HttpStatus.NOT_FOUND);
  }

  /**
   * Upload Avatar
   * @param user_id
   * @param avatar
   * @returns
   */
  async uploadAvatar(user_id: number, avatar) {
    const checkUserExists = await this.prisma.users.findFirst({
      where: {
        id: user_id,
      },
    });
    if (checkUserExists) {
      const updateAvatar = await this.prisma.users.update({
        data: {
          avatar: avatar,
        },
        where: {
          id: user_id,
        },
      });
      if (updateAvatar) {
        return {
          statusCode: 200,
          message: 'Upload avatar berhasil',
        };
      }
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  /**
   * Generate JWT Token
   * @param payload
   * @returns
   */
  generateJWT(payload: any) {
    return this.jwtService.sign(payload, {
      secret: jwt_config.secret,
      expiresIn: jwt_config.expired,
    });
  }
}
