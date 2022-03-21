import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RecipesService } from './recipes.service';
import { RecipesResolver } from './recipes.resolver';

@Module({
  imports: [HttpModule],
  providers: [RecipesService, RecipesResolver],
})
export class RecipesModule {}
