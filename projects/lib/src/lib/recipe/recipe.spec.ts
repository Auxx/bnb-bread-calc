import { calculateRecipeWeights } from './recipe';
import { parseInlineRecipe } from '../inline-parser/inline-parser';
import { sourRyeFormula } from '../../mocks/recipes';

describe('recipe.ts', () => {
  describe('calculateRecipeWeights', () => {
    it('should work', () => {
      const recipe = parseInlineRecipe(sourRyeFormula);
      calculateRecipeWeights(recipe, 1000);
    });
  });
});
