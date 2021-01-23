import { SimpleStageFormula } from '../simple-stage/simple-stage.types';
import { PrefermentFormula } from '../preferment-stage/preferment-stage.types';

export interface ProcessedRecipe {
  totalPercentage: number;
  totalWeight: number;
  stages: SimpleStageFormula[];
  sourceFormulas: SourceFormula[];
  totalRatios: RecipeTotals;
  totalWeights: RecipeTotals;
}

export interface RecipeTotals {
  flour: number;
  hydration: number;
  other: number;
}

export interface SourceSimpleFormula {
  type: 'simple';
  id: string;
  source: SimpleStageFormula;
}

export interface SourcePrefermentFormula {
  type: 'preferment';
  id: string;
  prefermented: number;
  source: PrefermentFormula;
}

export type SourceFormula =
  SourceSimpleFormula |
  SourcePrefermentFormula;
