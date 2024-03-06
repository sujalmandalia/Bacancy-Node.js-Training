import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './dto/createUser.dto';
import { UpdateUser } from './dto/updateUser.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getSingleUser(@Param('name') name: string) {
    return this.userService.findOne(name);
  }

  @Post()
  createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUser) {
    return this.userService.updateUser(id, user);
  }
}
