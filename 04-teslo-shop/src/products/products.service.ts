import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Product, ProductImage } from './entities';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  // Nota: TypeORM ya nos proporciona el patrón repositorio.
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage) private readonly productImageRepository: Repository<ProductImage>
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    // Se comenta porque, ahora, el slug se comprueba y se actualiza en la clase entidad Producto mediante el uso del decorador @BeforeInsert.
    /*if(!createProductDto.slug)
      createProductDto.slug = createProductDto.title.toLowerCase().replaceAll(' ', '_').replaceAll('\'','');*/
    const { images = [], ...productDetails } = createProductDto;
    try {
      // Este método "create" solo crea una instancia de la clase entidad "Product". No guarda en la base de datos.
      const product = this.productRepository.create({
        ...productDetails,
        images: images.map(image => this.productImageRepository.create({ url: image })),
        user
      });
      const savedProduct = await this.productRepository.save(product);
      return {
        ...savedProduct,
        // Descartamos los ids de las imágenes del producto.
        images: savedProduct.images.map(img => img.url)
      };
    }
    catch(error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    //return await this.productRepository.find(); // devuelve todos los productos de la base de datos sin paginar
    const products = await this.productRepository.find({ take: limit, skip: offset, relations: { images: true } });
    return products.map(product => ({
      ...product,
      // Descartamos los ids de las imágenes del producto.
      images: product.images.map(image => image.url)
    }));
  }

  async findOne(term: string) {
    let product: Product;
    
    if(isUUID(term)) 
      product= await this.productRepository.findOneBy({ id: term });
    else {
      //product= await this.productRepository.findOneBy({ slug: term });
      // Creamos y ejecutamos una consulta personalizada para encontrar un producto dato su título o su slug.
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder.where('UPPER(title) = UPPER(:title) or slug = :slug', {
        title: term,
        slug: term.toLowerCase()
      })
      .leftJoinAndSelect('prod.images', 'prodImages')
      .getOne();
    }

    if(!product)
      throw new NotFoundException(`Product with id or slug \'${ term }\' not found`);

    return product;
  }

  async findOnePlain(term: string) {
    const { images, ...rest } = await this.findOne(term);
    // Descartamos los ids de las imágenes
    return {
      ...rest,
      images: images.map(image => image.url)
    };
  } 

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    const { images = [], ...toUpdate } = updateProductDto;
    // Localiza y obtiene un producto por su id y carga en él los valores de las propiedades del objeto "updateProductDto" que estén presentes en ese producto.
    // Nota: Este método "preload" no actualiza la base de datos.
    const product = await this.productRepository.preload({ id, ...toUpdate, user });
    if(!product)
      throw new NotFoundException(`Product with id '${ id } not found'`);

    product.images = images.map(image => this.productImageRepository.create({ url: image }));

    try {
      const savedProduct = await this.productRepository.save(product);
      return {
        ...savedProduct,
        // Descartamos los ids de las imágenes del producto.
        images: savedProduct.images.map(img => img.url)
      };
    }
    catch(error) {
      this.handleExceptions(error)
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async removeAllProducts() {
    return await this.productRepository.delete({});
  }

  private handleExceptions(error: any) {
    // Error por duplicidad de datos en la base de datos
    if(error.code === '23505')
      throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error - Check server logs');
  }
}
