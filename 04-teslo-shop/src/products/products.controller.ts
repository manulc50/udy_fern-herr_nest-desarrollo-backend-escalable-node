import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth, GetUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { User } from '../auth/entities/user.entity';
import { Product } from './entities';


// Este Decorador nos permite agrupar bajo un nombre los endpoints de un controlador.
@ApiTags('Products')
// Nota: Como este Decorador "@Auth" está puesto a nivel de controlador, afecta a todos sus métodos handler.
//@Auth()
@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({ status: 201, description: 'Product was created', type: Product })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // Usando nuestro Decorador personalizado "@GetUser", obtenemos el usuario autenticado de la petición http.
  @Auth()
  @Post()
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  // Puede ser por id, por slug o por el título
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Auth(ValidRoles.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto, @GetUser() user: User) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Auth(ValidRoles.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
