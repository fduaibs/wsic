import { Args, Query, Resolver } from '@nestjs/graphql';
import { AxiosResponse } from 'axios';

import { IngredientsService } from './ingredients.service';

import { SearchIngredientsByNameOutput } from './dto/search-ingredients-by-name.output';

@Resolver()
export class IngredientsResolver {
  constructor(private ingredientsService: IngredientsService) {}

  @Query(() => [SearchIngredientsByNameOutput])
  async searchIngredientsByName(
    @Args('ingredientName') ingredientName: string,
  ): Promise<AxiosResponse<SearchIngredientsByNameOutput[]>> {
    const ingredientList =
      await this.ingredientsService.searchIngredientsByName(ingredientName);

    return ingredientList;
  }
}
