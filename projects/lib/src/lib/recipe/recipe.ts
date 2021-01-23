import { ParsedRecipe, ParsedStageValue, PartialParsedStage } from '../inline-parser/inline-parser.types';
import { prefermentToSimpleStage } from '../preferment-stage/preferment-stage';
import { SimpleStageBuilderOptions, SimpleStageElement, SimpleStageFormula } from '../simple-stage/simple-stage.types';
import { PrefermentStageBuilder } from '../preferment-stage/preferment-stage-builder';
import { baseIngredients, Ingredient, IngredientType } from '../ingredients/ingredients';
import { SimpleStageBuilder } from '../simple-stage/simple-stage-builder';
import { ProcessedRecipe, SourceFormula } from './recipe.types';
import { PrefermentFormula } from '../preferment-stage/preferment-stage.types';

export function calculateRecipeWeights(recipe: ParsedRecipe,
                                       weight: number,
                                       weightIsTotal = false,
                                       ingredients = baseIngredients): ProcessedRecipe {
  const sourceFormulas = prepareFormulas(recipe, ingredients);
  const processedStages = prepareParsedRecipe(sourceFormulas, ingredients);
  const totalRatios = aggregateIngredientRatios(processedStages);
  const totalPercentage = totalRatios.flour + totalRatios.hydration + totalRatios.other;
  const totalWeight = weightIsTotal ? weight : weight / totalRatios.flour * totalPercentage;

  return {
    totalPercentage,
    totalWeight,
    totalRatios,
    sourceFormulas,
    stages: calculateRatiosToWeight(processedStages, totalPercentage, totalWeight),
    totalWeights: {
      flour: totalRatios.flour * totalWeight / totalPercentage,
      hydration: totalRatios.hydration * totalWeight / totalPercentage,
      other: totalRatios.other * totalWeight / totalPercentage
    }
  };
}

export function prepareFormulas(recipe: ParsedRecipe, ingredients = baseIngredients) {
  return Object.keys(recipe)
    .map(key => recipe[key])
    .map(stage => getFormula(stage, ingredients))
    .filter(stage => stage !== null);
}

export function prepareParsedRecipe(recipe: SourceFormula[], ingredients = baseIngredients) {
  return recipe
    .map(formula => getSimpleStage(formula, ingredients))
    .filter(stage => stage !== null);
}

export function mapRatiosToWeight(item: SimpleStageElement,
                                  stageMap: { [key: string]: SimpleStageFormula },
                                  searchIn: 'flour' | 'hydration' | 'other',
                                  totalWeight: number,
                                  totalPercentage: number): SimpleStageElement {
  return {
    ...item,
    totalWeight: getTotalIngredientRatio(item, stageMap, searchIn) * totalWeight / totalPercentage
  };
}

export function calculateRatiosToWeight(stages: SimpleStageFormula[], totalPercentage: number, totalWeight: number): SimpleStageFormula[] {
  const originalMap = stageListToMap(stages);

  const preprocessed = stages.map(stage => {
    const temp: SimpleStageFormula = {
      id: stage.id,
      flour: stage.flour.map(item => mapRatiosToWeight(item, originalMap, 'flour', totalWeight, totalPercentage)),
      hydration: stage.hydration.map(item => mapRatiosToWeight(item, originalMap, 'hydration', totalWeight, totalPercentage)),
      other: stage.other.map(item => mapRatiosToWeight(item, originalMap, 'other', totalWeight, totalPercentage)),
      stages: stage.stages
    };

    return {
      ...temp,
      totalWeight: getStageTotalWeight(temp)
    };
  });

  const processedMap = stageListToMap(preprocessed);

  return preprocessed.map(stage => {
    const childStages = stage.stages.map(child =>
      ({
        ...child,
        totalWeight: processedMap[child.id].totalWeight * child.ratio
      } as SimpleStageElement));

    return {
      ...stage,
      stages: childStages,
      totalWeight: stage.totalWeight + childStages.reduce((total, item) => total + item.totalWeight, 0)
    } as SimpleStageFormula;
  });
}

export function getStageTotalWeight(stage: SimpleStageFormula) {
  return stage.flour.reduce((total, item) => total + item.totalWeight, 0) +
    stage.hydration.reduce((total, item) => total + item.totalWeight, 0) +
    stage.other.reduce((total, item) => total + item.totalWeight, 0);
}

export function stageListToMap(stages: SimpleStageFormula[]) {
  return stages.reduce((acc, stage) => ({ ...acc, [stage.id]: stage }), {});
}

function aggregateIngredientRatios(stages: SimpleStageFormula[]) {
  const stageMap = stageListToMap(stages);

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

function getFormula(stage: PartialParsedStage, ingredients: Ingredient[]): SourceFormula {
  switch (stage.type) {
    case 'preferment':
      return {
        type: 'preferment',
        id: stage.id,
        prefermented: getNumber(stage.data.prefermented[0]),
        source: fromPrefermentStage(stage)
      };

    case 'simple':
      return {
        type: 'simple',
        id: stage.id,
        source: fromSimpleStage(stage, ingredients)
      };

    default:
      return null;
  }
}

function getSimpleStage(formula: SourceFormula, ingredients: Ingredient[]): SimpleStageFormula {
  switch (formula.type) {
    case 'preferment':
      return prefermentToSimpleStage(formula.source, formula.prefermented, formula.id);

    case 'simple':
      return formula.source;

    default:
      return null;
  }
}

function fromPrefermentStage(stage: PartialParsedStage): PrefermentFormula {
  return PrefermentStageBuilder
    .start()
    .flour(getString(stage.data.flourType[0]))
    .starterHydration(getNumber(stage.data.starterHydration[0]))
    .outputHydration(getNumber(stage.data.outputHydration[0]))
    .flourRatio(getNumber(stage.data.flourRatio[0]))
    .build();
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
