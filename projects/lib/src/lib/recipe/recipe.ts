import { OverallFormula, Recipe } from './recipe.types';
import { ParsedRecipe, ParsedStageValue, PartialParsedStage } from '../inline-parser/inline-parser.types';
import { prefermentToSimpleStage } from '../preferment-stage/preferment-stage';
import { SimpleStageBuilderOptions, SimpleStageFormula } from '../simple-stage/simple-stage.types';
import { PrefermentStageBuilder } from '../preferment-stage/preferment-stage-builder';
import { baseIngredients, Ingredient, IngredientType } from '../ingredients/ingredients';
import { SimpleStageBuilder } from '../simple-stage/simple-stage-builder';

interface IngredientMap {
  [key: string]: number;
}

export function calculateOverallFormula(recipe: Recipe): OverallFormula {
  const flour: IngredientMap = {};
  const hydration: IngredientMap = {};
  const other: IngredientMap = {};

  recipe.forEach(stage => {
    const formula = stage.type === 'preferment' ? stage.convertedStage : stage.stage;

    formula.flour.forEach(ingredient => {
      if (!flour.hasOwnProperty(ingredient.id)) {
        flour[ingredient.id] = 0;
      }

      flour[ingredient.id] += ingredient.ratio;
    });
  });

  return [];
}

export function calculateRecipeWeights(recipe: ParsedRecipe, flourWeight: number, ingredients = baseIngredients) {
  Object.keys(recipe)
    .map(key => recipe[key])
    .map(stage => getSimpleStage(stage, ingredients))
    .filter(stage => stage !== null)
    .forEach(stage => console.log(JSON.stringify(stage, null, 2)));
}

function getSimpleStage(stage: PartialParsedStage, ingredients: Ingredient[]): SimpleStageFormula {
  switch (stage.type) {
    case 'preferment':
      return fromPrefermentStage(stage);

    case 'simple':
      return fromSimpleStage(stage, ingredients);

    default:
      return null;
  }
}

function fromPrefermentStage(stage: PartialParsedStage): SimpleStageFormula {
  return prefermentToSimpleStage(
    PrefermentStageBuilder
      .start()
      .flour(getString(stage.data.flourType[0]))
      .starterHydration(getNumber(stage.data.starterHydration[0]))
      .outputHydration(getNumber(stage.data.outputHydration[0]))
      .flourRatio(getNumber(stage.data.flourRatio[0]))
      .build(),
    getNumber(stage.data.prefermented[0]));
}

function fromSimpleStage(stage: PartialParsedStage, ingredients: Ingredient[]): SimpleStageFormula {
  const builder = SimpleStageBuilder.start();

  Object.keys(stage.data).forEach(key => mapStageIngredient(key, stage.data[key], ingredients, builder));

  return builder.build();
}

function mapStageIngredient(id: string, value: ParsedStageValue[], ingredients: Ingredient[], builder: SimpleStageBuilder) {
  const ingredient = ingredients.find(i => i.id === id);

  if (ingredient === undefined) {
    return;
  }

  const opts: SimpleStageBuilderOptions = { combineWithExisting: true };

  if (value.length > 1 && typeof value[1] === 'string') {
    opts.subtractFrom = value[1];
  }

  switch (ingredient.type) {
    case IngredientType.flour:
      builder.flour(id, getNumber(value[0]), opts);
      break;

    case IngredientType.hydration:
      builder.hydration(id, getNumber(value[0]), opts);
      break;

    case IngredientType.other:
      builder.other(id, getNumber(value[0]), opts);
      break;

    case IngredientType.stage:
      builder.stage(getString(value[0]), getNumber(value[1], 1), { combineWithExisting: false });
      break;
  }
}

function getNumber(value: ParsedStageValue, defaultValue = 0): number {
  return typeof value === 'number' ? value : defaultValue;
}

function getString(value: ParsedStageValue, defaultValue = ''): string {
  return typeof value === 'string' ? value : defaultValue;
}
