import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

// Nota: Este módulo y sus componentes(controlador, servicio, etc...) han sido genereados de forma automática con el comando
// de Nest CLI "nest g|generate res|resource auth --no-spec". La opción "--no-spec" es para que no genere el archivo de pruebas.

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    // Tenemos que indicar al módulo TypeOrm cuáles son las entidades que tiene que manejar
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Registro asíncrono -> Nos permite, entre otras cosas, realizar inyecciones de componentes(En este caso, inyectamos el servicio "ConfigService").
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        //console.log('Jwt Secret', configService.get('JWT_SECRET'));
        //console.log('JWT_SECRET', process.env.JWT_SECRET);
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h'
          }
        };
      }
    })
    // Registro síncrono
    /*JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '2h'
      }
    })*/
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
