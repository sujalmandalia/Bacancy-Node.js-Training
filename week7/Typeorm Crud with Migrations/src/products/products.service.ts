import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Args, Int } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRespository: Repository<User>,
  ) {}

  async create(data: CreateProductInput): Promise<Product> {
    try {
      console.log(data.userId);
      const user = await this.userRespository.findOne({
        where: { id: data.userId },
      });
      console.log(user);
      const product = this.productRepository.create({
        user: user,
        name: data.name,
      });
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(condition): Promise<Product[]> {
    try {
      const products = await this.productRepository.find({where:condition});
      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOneOrFail({
        where: { id: id },
      });
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateProduct: UpdateProductInput,
  ): Promise<Product> {
    try {
      const update = await this.productRepository.update({ id }, updateProduct);
      if (update.affected === 0) {
        throw new BadRequestException('No Product With The given ID');
      }
      const product = await this.productRepository.findOne({
        where: { id: id },
      });
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<String> {
    try {
      const deleted = await this.productRepository.delete(id);
      if (deleted.affected === 0) {
        throw new BadRequestException('No Product With The Given ID');
      }
      return 'Product Deleted Successfully';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
