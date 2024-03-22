import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  age: number;

  @Column()
  @Field({ nullable: true })
  email: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
