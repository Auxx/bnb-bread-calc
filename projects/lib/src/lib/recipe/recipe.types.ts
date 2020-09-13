import { SimpleStageFormula } from '../simple-stage/simple-stage.types';
import { PrefermentFormula } from '../preferment-stage/preferment-stage.types';

export interface SimpleStageRecipeElement {
  type: 'simple';
  id: string;
  stage: SimpleStageFormula;
}

export interface PrefermentStageRecipeElement {
  type: 'preferment';
  id: string;
  stage: PrefermentFormula;
  convertedStage: SimpleStageFormula;
  prefermentedAmount: number;
}

export type RecipeElement = SimpleStageRecipeElement | PrefermentStageRecipeElement;

export interface RecipeIngredient {
  id: string;
  ratio: number;
}

export type Recipe = RecipeElement[];

export type OverallFormula = RecipeIngredient[];
