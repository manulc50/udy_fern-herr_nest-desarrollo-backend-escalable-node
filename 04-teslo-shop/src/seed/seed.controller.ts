import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

// Este Decorador nos permite agrupar bajo un nombre los endpoints de un controlador.
@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  
  constructor(private readonly seedService: SeedService) {}

  //@Auth(ValidRoles.ADMIN)
  @Post()
  executeSeed() {
    return this.seedService.runSeed();
  }

}
