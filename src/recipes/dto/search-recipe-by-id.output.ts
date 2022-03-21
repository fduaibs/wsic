import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

@ObjectType()
export class SearchRecipeByIdOutput {
  @IsBoolean()
  @IsOptional()
  @Field()
  vegetarian?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field()
  vegan?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field()
  glutenFree?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field()
  dairyFree?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field()
  veryHealthy?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field()
  cheap?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field()
  veryPopular?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field()
  sustainable?: boolean;

  @IsNumber()
  @IsNotEmpty({
    message: 'The field "id" cannot be empty',
  })
  @Field()
  id: number;

  @IsString()
  @IsNotEmpty({
    message: 'The field "title" cannot be empty',
  })
  @Field()
  title: string;

  @IsNumber()
  @IsOptional()
  @Field()
  readyInMinutes?: number;

  @IsNumber()
  @IsOptional()
  @Field()
  preparationMinutes?: number;

  @IsNumber()
  @IsOptional()
  @Field()
  cookingMinutes?: number;

  @IsNumber()
  @IsOptional()
  @Field()
  servings?: number;

  @IsString()
  @IsNotEmpty({
    message: 'The field "image" cannot be empty',
  })
  @Field()
  image: string;

  @IsString()
  @IsNotEmpty({
    message: 'The field "imageType" cannot be empty',
  })
  @Field()
  imageType: string;

  @IsString()
  @IsNotEmpty({
    message: 'The field "summary" cannot be empty',
  })
  @Field()
  summary: string;

  @IsOptional()
  @Field()
  instructions?: string;
}
