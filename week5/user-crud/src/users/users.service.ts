import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './dto/createUser.dto';
import { UpdateUser } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.createUser(user);
  }

  async findOne(name: string) {
    const users = await this.userRepository.getAllUsers();
    const required_user = users.find((user: User) => user.name === name);
    if (!required_user) {
      throw new BadRequestException();
    }
    return required_user;
  }

  // async loginUser(username: string) {
  //   const users = await this.userRepository.getAllUsers();
  //   const required_user = users.find((user: User) => user.name === username);
  //   if (required_user === null) {
  //     throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
  //   } else {
  //     console.log(required_user);
  //     const token = jwt.sign({id:required_user.id},'jwtsecret')
  //     console.log(token);
  //   }
  // }

  async deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }

  async updateUser(id:number , userData: Partial<User>):Promise<User>{
    return this.userRepository.updateUser(id,userData)
  }
}
