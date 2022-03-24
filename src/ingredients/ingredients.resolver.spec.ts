import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsResolver } from './ingredients.resolver';

describe('IngredientsResolver', () => {
  let resolver: IngredientsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientsResolver],
    }).compile();

    resolver = module.get<IngredientsResolver>(IngredientsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
