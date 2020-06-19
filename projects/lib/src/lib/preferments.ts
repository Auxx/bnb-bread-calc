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

export interface PrefermentComposition {
  totalFlour: number;
  totalHydration: number;
  starterFlour: number;
  starterHydration: number;
  freshFlour: number;
  freshHydration: number;
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

export function calculatePrefermentComposition(formula: PrefermentFormula): PrefermentComposition {
  const ratios = calculatePrefermentWeights(formula, 1);

  const starterTotal = 1 + formula.starterHydration;
  const starterFlour = ratios.starter / starterTotal;
  const starterHydration = ratios.starter - starterFlour;

  const freshFlour = starterFlour * formula.flourRatio;

  const totalFlour = freshFlour + starterFlour;

  return {
    totalFlour: 1,
    totalHydration: formula.outputHydration,

    starterFlour: starterFlour / totalFlour,
    starterHydration: starterHydration / totalFlour,

    freshFlour: freshFlour / totalFlour,
    freshHydration: formula.outputHydration - starterHydration / totalFlour
  };
}
