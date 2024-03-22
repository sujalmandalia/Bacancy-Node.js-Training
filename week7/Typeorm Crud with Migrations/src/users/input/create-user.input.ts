import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name:string

  @Field(type=>Int)
  age:number

  @Field()
  email:string
}
