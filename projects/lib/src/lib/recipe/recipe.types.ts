import { SimpleStageFormula } from '../simple-stage/simple-stage.types';

export interface ProcessedRecipe {
  totalPercentage: number;
  totalWeight: number;
  stages: SimpleStageFormula[];
  totalRatios: RecipeTotals;
  totalWeights: RecipeTotals;
}

export interface RecipeTotals {
  flour: number;
  hydration: number;
  other: number;
}
