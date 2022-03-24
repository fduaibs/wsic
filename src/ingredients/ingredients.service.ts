import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

import { SearchIngredientsByNameOutput } from './dto/search-ingredients-by-name.output';

@Injectable()
export class IngredientsService {
  constructor(private httpService: HttpService) {}

  async searchIngredientsByName(
    ingredientName: string,
  ): Promise<AxiosResponse<SearchIngredientsByNameOutput[]>> {
    const url = `${process.env.SPOONACULAR_API_BASE_URL}/food/ingredients/search?apiKey=${process.env.SPOONACULAR_API_KEY}&query=${ingredientName}`;

    try {
      const response = await lastValueFrom(this.httpService.get(url).pipe());

      return response.data.results;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
