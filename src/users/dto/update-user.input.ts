import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'The field "name" cannot be empty' })
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'The field "email" cannot be empty' })
  @IsOptional()
  email?: string;
}
