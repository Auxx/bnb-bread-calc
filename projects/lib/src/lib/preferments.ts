export interface PrefermentFormula {
  starterHydration: number;
  outputHydration: number;
  flourRatio: number;
}

export interface PrefermentWeights {
  starter: number;
  flour: number;
  water: number;
}

export function translatePrefermentPercentages(formula: PrefermentFormula): PrefermentFormula {
  return {
    starterHydration: formula.starterHydration / 100,
    outputHydration: formula.outputHydration / 100,
    flourRatio: formula.flourRatio
  };
}

export function translatePrefermentRatios(formula: PrefermentFormula): PrefermentFormula {
  return {
    starterHydration: formula.starterHydration * 100,
    outputHydration: formula.outputHydration * 100,
    flourRatio: formula.flourRatio
  };
}

export function calculatePrefermentWeights(formula: PrefermentFormula, requiredWeight: number): PrefermentWeights {
  const flour = requiredWeight
    / (1 + formula.outputHydration)
    - (requiredWeight / (1 + formula.outputHydration) / (1 + formula.flourRatio));

  const starter = flour
    / formula.flourRatio
    + (flour / formula.flourRatio * formula.starterHydration);

  return {
    flour,
    starter,
    water: requiredWeight - flour - starter
  };
}
