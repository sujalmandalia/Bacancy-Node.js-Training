import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRespository: Repository<User>,
  ) {}

  async create(data: createUserDto): Promise<User> {
    try {
      const user = this.userRespository.create(data);
      await this.userRespository.save(user);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRespository.find();
      return users;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRespository.findOneOrFail({
        where: { id: id },
      });
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number) {
    try {
      const deleted = await this.userRespository.delete({ id });
      if(deleted.affected === 0){
        throw new BadRequestException("No User With The Given ID")
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updatedData: UpdateUserDto) {
    try {
      const update = await this.userRespository.update({ id }, updatedData);
      if (update.affected === 0) {
        throw new BadRequestException('No User With The given ID');
      }
      const user = await this.userRespository.findOneBy({ id });
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
