import { OverallFormula, Recipe } from './recipe.types';
import { ParsedRecipe, ParsedStageValue, PartialParsedStage } from '../inline-parser/inline-parser.types';
import { prefermentToSimpleStage } from '../preferment-stage/preferment-stage';
import { SimpleStageBuilderOptions, SimpleStageElement, SimpleStageFormula } from '../simple-stage/simple-stage.types';
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

export function calculateRecipeWeights(recipe: ParsedRecipe, weight: number, weightIsTotal = false, ingredients = baseIngredients) {
  const processedStages = prepareParsedRecipe(recipe, ingredients);
  const totalRatios = aggregateIngredientRatios(processedStages);
  const totalPercentage = totalRatios.flour + totalRatios.hydration + totalRatios.other;
  const totalWeight = weightIsTotal ? weight : weight / totalRatios.flour * totalPercentage;

  console.log('totalWeight', totalWeight);
}

export function prepareParsedRecipe(recipe: ParsedRecipe, ingredients = baseIngredients) {
  return Object.keys(recipe)
    .map(key => recipe[key])
    .map(stage => getSimpleStage(stage, ingredients))
    .filter(stage => stage !== null);
}

function aggregateIngredientRatios(stages: SimpleStageFormula[]) {
  const stageMap = stages.reduce((acc, stage) => ({ ...acc, [stage.id]: stage }), {});

  return stages.reduce(
    (acc, stage) => {
      acc.flour = stage.flour.reduce((total, item) => total + getTotalIngredientRatio(item, stageMap, 'flour'), acc.flour);
      acc.hydration = stage.hydration.reduce((total, item) => total + getTotalIngredientRatio(item, stageMap, 'hydration'), acc.hydration);
      acc.other = stage.other.reduce((total, item) => total + getTotalIngredientRatio(item, stageMap, 'other'), acc.other);
      return acc;
    },
    {
      flour: 0,
      hydration: 0,
      other: 0
    });
}

function getTotalIngredientRatio(item: SimpleStageElement,
                                 stageMap: { [key: string]: SimpleStageFormula },
                                 searchIn: 'flour' | 'hydration' | 'other') {
  if (typeof item.subtractFrom === 'string') {
    if (item.subtractFrom in stageMap) {
      const relation = stageMap[item.subtractFrom][searchIn].find(i => i.id === item.id);

      if (relation instanceof Object) {
        return item.ratio - relation.ratio;
      }
    }
  }

  return item.ratio;
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
    getNumber(stage.data.prefermented[0]),
    stage.id);
}

function fromSimpleStage(stage: PartialParsedStage, ingredients: Ingredient[]): SimpleStageFormula {
  const builder = SimpleStageBuilder
    .start()
    .id(stage.id);

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
