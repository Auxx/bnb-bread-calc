import { SimpleStageFormula } from '../simple-stage/simple-stage.types';
import { PrefermentFormula } from '../preferment-stage/preferment-stage.types';

export interface SimpleStageElement {
  type: 'simple';
  id: string;
  stage: SimpleStageFormula;
}

export interface PrefermentStageElement {
  type: 'preferment';
  id: string;
  stage: PrefermentFormula;
  convertedStage: SimpleStageFormula;
  prefermentedAmount: number;
}

export type RecipeElement = SimpleStageElement | PrefermentStageElement;
