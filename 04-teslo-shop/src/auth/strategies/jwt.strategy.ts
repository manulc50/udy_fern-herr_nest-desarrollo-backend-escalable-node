import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly ConfigService: ConfigService
    ) {
        super({
            // Indicamos la clave secreta del token JWT.
            secretOrKey: ConfigService.get('JWT_SECRET'),
            // Indicamos que el token JWT se enviará en una cabecera de tipo "Bearer"("Authorization": "Bearer ...").
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    // Nota: Este método se ejecuta cuando el token JWT se ha validado con la firma satisfactoriamente.
    // Nota: Aquello que retorne este método, se añade automáticamente a la petición http(En este caso, devolvemos el usuario autenticado).
    async validate(payload: JwtPayload): Promise<User> {
        const { id } = payload;

        const user = await this.userRepository.findOneBy({ id });

        if(!user)
            throw new UnauthorizedException(`User with id '${ id }' does not exist`);

        if(!user.isActive)
            throw new UnauthorizedException(`User with id '${ id }' is inactive - Talk with an admin`);

        return user;
    }

}