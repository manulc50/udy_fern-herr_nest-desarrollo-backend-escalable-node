import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async runSeed() {
    await this.deleteTables();
    const firstUser = await this.insertUsers();
    await this.insertProducts(firstUser);
    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.productsService.removeAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const { users: seedUsers } = initialData;
    const users: User[] = seedUsers.map(user => this.userRepository.create(user));
    const savedUsers = await this.userRepository.save(users);
    return savedUsers[0];
  }

  private async insertProducts(user: User) {
    const { products } = initialData;
    const insertPromises = [];
    products.forEach(product => insertPromises.push(this.productsService.create(product, user)));
    await Promise.all(insertPromises);
  }

}
