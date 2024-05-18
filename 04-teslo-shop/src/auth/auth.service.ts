import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto , LoginUserDto} from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...restUserData } = createUserDto;
    try {
      const user = this.userRepository.create({
        ...restUserData,
        password: bcrypt.hashSync(password, 10)
      });
      const savedUser = await this.userRepository.save(user);
      // Eliminamos la contraseña del objeto "user" para que no se envíe en la respuesta http.
      delete savedUser.password;
      return {
        ...savedUser,
        token: this.getJwtToken({ id: savedUser.id})
      };
    }
    catch(error) {
      this.handleExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, password: true, isActive: true } });

    if(!user)
      throw new UnauthorizedException('Credentials ara no valid');

    if(!user.isActive)
      throw new UnauthorizedException(`User with id '${ user.id }' is inactive - Talk with an admin`);

    if(!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials ara no valid');

    return {
      token: this.getJwtToken({ id: user.id })
    };
  }

  refreshToken(id: string) {
    return {
      token: this.getJwtToken({ id })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  // Nota: "never" es como "void" en Java,
  private handleExceptions(error: any): never {
    if(error.code === '23505')
      throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error - Check server logs');
  }

}
