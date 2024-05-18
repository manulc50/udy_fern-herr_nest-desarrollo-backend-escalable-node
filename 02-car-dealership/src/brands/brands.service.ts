import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  // Se comenta porque ahora los datos se cargan desde el módulo "seed"
  /*private brands: Brand[] = [
    {
      id: uuid(),
      name: 'toyota',
      createdAt: new Date().getTime()
    }
  ];*/
  private brands: Brand[] = [];

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const brand: Brand = {
      id: uuid(),
      name: name.toLowerCase(),
      createdAt: new Date().getTime()
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id === id);
    if(!brand)
      throw new NotFoundException(`Brand with id '${id}' not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = this.findOne(id);
    Object.assign(brand, updateBrandDto);
    brand.updatedAt = new Date().getTime();
    return brand;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    this.brands = this.brands.filter(b => b.id !== brand.id);
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
