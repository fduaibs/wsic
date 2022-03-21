import { Args, Query, Resolver } from '@nestjs/graphql';

import { RecipesService } from './recipes.service';

import { AxiosResponse } from 'axios';

import { SearchRecipesWithAutoCompleteOutput } from './dto/search-recipes-autocomplete.output';
import { SearchRecipeByIdOutput } from './dto/search-recipe-by-id.output';
import { SearchRecipesByIngredientsOutput } from './dto/search-recipes-by-ingredients.output';

@Resolver()
export class RecipesResolver {
  constructor(private recipeService: RecipesService) {}

  @Query(() => [SearchRecipesWithAutoCompleteOutput])
  async searchRecipesWithAutocomplete(
    @Args('recipeName') recipeName: string,
  ): Promise<AxiosResponse<SearchRecipesWithAutoCompleteOutput[]>> {
    const recipeList = await this.recipeService.searchRecipesWithAutoComplete(
      recipeName,
    );

    return recipeList;
  }

  @Query(() => SearchRecipeByIdOutput)
  async searchRecipeById(
    @Args('id') id: number,
  ): Promise<AxiosResponse<SearchRecipeByIdOutput>> {
    const returnedRecipe = await this.recipeService.searchRecipeById(id);

    return returnedRecipe;
  }

  @Query(() => [SearchRecipesByIngredientsOutput])
  async searchRecipesByIngredients(
    @Args('ingredients') ingredients: string,
  ): Promise<AxiosResponse<SearchRecipesByIngredientsOutput[]>> {
    const returnedRecipes = await this.recipeService.searchRecipesByIngredients(
      ingredients,
    );

    return returnedRecipes;
  }
}
