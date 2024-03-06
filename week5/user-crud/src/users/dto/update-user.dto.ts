import { PartialType } from '@nestjs/mapped-types';
import { User } from './createUser.dto';

export class UpdateUserDto extends PartialType(User) {

}
