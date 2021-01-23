import { calculateRecipeWeights } from './recipe';
import { parseInlineRecipe } from '../inline-parser/inline-parser';
import { simpleWheatFormula } from '../../mocks/recipes';

describe('recipe.ts', () => {
  describe('calculateRecipeWeights', () => {
    it('should work', () => {
      const recipe = parseInlineRecipe(simpleWheatFormula);
      calculateRecipeWeights(recipe, 650, true);
    });
  });
});
