import { PrefermentComposition, PrefermentFormula, PrefermentWeights } from './preferment-stage.types';

export function translatePrefermentPercentages(formula: PrefermentFormula): PrefermentFormula {
  return {
    ...formula,
    starterHydration: formula.starterHydration / 100,
    outputHydration: formula.outputHydration / 100
  };
}

export function translatePrefermentRatios(formula: PrefermentFormula): PrefermentFormula {
  return {
    ...formula,
    starterHydration: formula.starterHydration * 100,
    outputHydration: formula.outputHydration * 100
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
    totalFlour: 1 * formula.prefermentedAmount,
    totalHydration: formula.outputHydration * formula.prefermentedAmount,

    starterFlour: (starterFlour / totalFlour) * formula.prefermentedAmount,
    starterHydration: (starterHydration / totalFlour) * formula.prefermentedAmount,

    freshFlour: (freshFlour / totalFlour) * formula.prefermentedAmount,
    freshHydration: (formula.outputHydration - starterHydration / totalFlour) * formula.prefermentedAmount,

    flour: formula.flour
  };
}
