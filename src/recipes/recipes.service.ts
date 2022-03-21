import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

import { SearchRecipesWithAutoCompleteOutput } from './dto/search-recipes-autocomplete.output';
import { SearchRecipeByIdOutput } from './dto/search-recipe-by-id.output';
import { SearchRecipesByIngredientsOutput } from './dto/search-recipes-by-ingredients.output';

@Injectable()
export class RecipesService {
  constructor(private httpService: HttpService) {}

  async searchRecipesWithAutoComplete(
    recipeName: string,
  ): Promise<AxiosResponse<SearchRecipesWithAutoCompleteOutput[]>> {
    const url = `${process.env.SPOONACULAR_API_BASE_URL}/recipes/autocomplete?apiKey=${process.env.SPOONACULAR_API_KEY}&number=10&query=${recipeName}`;

    try {
      const response = await lastValueFrom(this.httpService.get(url).pipe());

      return response.data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async searchRecipeById(
    id: number,
  ): Promise<AxiosResponse<SearchRecipeByIdOutput>> {
    const url = `${process.env.SPOONACULAR_API_BASE_URL}/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=false`;

    try {
      const response = await lastValueFrom(this.httpService.get(url).pipe());

      return response.data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async searchRecipesByIngredients(
    ingredients: string,
  ): Promise<AxiosResponse<SearchRecipesByIngredientsOutput[]>> {
    const url = `${process.env.SPOONACULAR_API_BASE_URL}/recipes/findByIngredients?apiKey=${process.env.SPOONACULAR_API_KEY}&ingredients=${ingredients}`;

    try {
      const response = await lastValueFrom(this.httpService.get(url).pipe());

      return response.data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
