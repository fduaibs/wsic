import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
export class SearchRecipesWithAutoCompleteOutput {
  @IsNumber()
  @IsNotEmpty({ message: 'The field "id" cannot be empty' })
  @Field()
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'The field "title" cannot be empty' })
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'The field "imageType" cannot be empty' })
  @Field()
  imageType: string;
}
