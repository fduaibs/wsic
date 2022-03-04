import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';

@ObjectType()
export class DeleteUserOutput {
  @IsBoolean()
  @IsNotEmpty({ message: 'The field "deleted" cannot be empty' })
  @Field()
  deleted: boolean;

  @IsObject()
  @IsNotEmpty({ message: 'The field "user" cannot be empty' })
  @IsOptional()
  @Field({ nullable: true })
  user?: User;
}
