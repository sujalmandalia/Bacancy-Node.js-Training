import {
  BadRequestException,
  Body,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { User } from './dto/createUser.dto';
import { UpdateUser } from './dto/updateUser.dto';

@Injectable()
export class UsersRepository {
  async getAllUsers(): Promise<User[]> {
    const users = await readFile('users.json', 'utf-8');
    const data = await JSON.parse(users);
    return data;
  }
  async createUser(user: User): Promise<User> {
    const data = await readFile('users.json', 'utf-8');
    const users = JSON.parse(data);
    user.id = Date.now();
    users.push(user);
    await writeFile('users.json', JSON.stringify(users));
    return user;
  }

  async deleteUser(id: number) {
    const data = await readFile('users.json', 'utf-8');
    const users = await JSON.parse(data);
    const required_users = await users.filter((user: User) => user.id !== +id);
    if (required_users.length === users.length) {
      throw new BadRequestException();
    } else {
      await writeFile('users.json', JSON.stringify(required_users));
    }
    return 'Delete User Success';
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const users = await this.getAllUsers();
    const userIndex = users.findIndex((user) => user.id === +id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const updatedUser = { ...users[userIndex], ...userData };
    users[userIndex] = updatedUser;
    await writeFile('users.json', JSON.stringify(users));
    return updatedUser;
  }
}
