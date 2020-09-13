import { Recipe } from './recipe.types';
import { SimpleStageFormula } from '../simple-stage/simple-stage.types';
import { PrefermentFormula } from '../preferment-stage/preferment-stage.types';
import { prefermentToSimpleStage } from '../preferment-stage/preferment-stage';

export class RecipeBuilder {
  private readonly stageList: Recipe = [];

  static start() {
    return new RecipeBuilder();
  }

  simpleStage(id: string, formula: SimpleStageFormula) {
    this.stageList.push({ type: 'simple', id, stage: formula });
    return this;
  }

  preferment(id: string, formula: PrefermentFormula, prefermentedAmount: number) {
    this.stageList.push({
      id,
      prefermentedAmount,
      type: 'preferment',
      stage: formula,
      convertedStage: prefermentToSimpleStage(formula, prefermentedAmount)
    });
    return this;
  }

  build(): Recipe {
    return this.stageList;
  }
}
