import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './input/create-user.input';
import { UpdateUserInput } from './input/update-user.input';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
  ) {}

  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  async getSingleUser(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => String, { nullable: true })
  async removeUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<String> {
    return this.userService.delete(id);
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    return this.userService.update(id, updateUserInput);
  }

  @ResolveField('products', () => [Product])
  async products(@Parent() user: User): Promise<Product[]> {
    const { id } = user;
    console.log(id);
    return this.productService.findAll({user});
  }
}
