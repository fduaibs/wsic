import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
export class SearchRecipesByIngredientsOutput {
  @IsNumber()
  @IsNotEmpty({ message: 'The field "id" cannot be empty' })
  @Field()
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'The field "title" cannot be empty' })
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'The field "image" cannot be empty' })
  @Field()
  image: string;

  @IsString()
  @IsNotEmpty({ message: 'The field "imageType" cannot be empty' })
  @Field()
  imageType: string;

  @IsNumber()
  @IsNotEmpty({ message: 'The field "usedIngredientCount" cannot be empty' })
  @Field()
  usedIngredientCount: number;

  @IsNumber()
  @IsNotEmpty({ message: 'The field "missedIngredientCount" cannot be empty' })
  @Field()
  missedIngredientCount: number;
}
