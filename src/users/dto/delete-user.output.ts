import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';

@InputType()
export class DeleteUserOutput {
  @IsBoolean()
  @IsNotEmpty({ message: 'The field "deleted" cannot be empty' })
  deleted: boolean;

  @IsObject()
  @IsNotEmpty({ message: 'The field "user" cannot be empty' })
  @IsOptional()
  user?: User;
}
