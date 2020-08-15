export interface PrefermentFormula {
  starterHydration: number;
  outputHydration: number;
  flourRatio: number;

  // TODO Move it outside of model
  prefermentedAmount?: number;
  flour?: string;
}

export interface PrefermentWeights {
  starter: number;
  flour: number;
  water: number;
}

export interface PrefermentComposition {
  totalFlour: number;
  totalHydration: number;
  starterFlour: number;
  starterHydration: number;
  freshFlour: number;
  freshHydration: number;

  flour?: string;
}
