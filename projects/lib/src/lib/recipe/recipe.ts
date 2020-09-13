import { OverallFormula, Recipe } from './recipe.types';

interface IngredientMap {
  [ key: string ]: number;
}

export function calculateOverallFormula(recipe: Recipe): OverallFormula {
  const flour: IngredientMap = {};
  const hydration: IngredientMap = {};
  const other: IngredientMap = {};

  recipe.forEach(stage => {
    const formula = stage.type === 'preferment' ? stage.convertedStage : stage.stage;

    formula.flour.forEach(ingredient => {
      if (!flour.hasOwnProperty(ingredient.id)) {
        flour[ ingredient.id ] = 0;
      }

      flour[ ingredient.id ] += ingredient.ratio;
    });
  });

  return [];
}
