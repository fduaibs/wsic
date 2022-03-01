import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'O campo name não pode estar vazio' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O campo email não pode estar vazio' })
  email: string;
}
