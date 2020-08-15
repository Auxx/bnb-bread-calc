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

export function calculatePrefermentWeightsForFlour(formula: PrefermentFormula, requiredWeight: number): PrefermentWeights {
  return calculatePrefermentWeights(formula, requiredWeight + (requiredWeight * formula.outputHydration));
}

export function calculatePrefermentComposition(formula: PrefermentFormula, prefermentedAmount: number): PrefermentComposition {
  const ratios = calculatePrefermentWeights(formula, 1);

  const starterTotal = 1 + formula.starterHydration;
  const starterFlour = ratios.starter / starterTotal;
  const starterHydration = ratios.starter - starterFlour;

  const freshFlour = starterFlour * formula.flourRatio;
  const totalFlour = freshFlour + starterFlour;

  return {
    totalFlour: 1 * prefermentedAmount,
    totalHydration: formula.outputHydration * prefermentedAmount,

    starterFlour: (starterFlour / totalFlour) * prefermentedAmount,
    starterHydration: (starterHydration / totalFlour) * prefermentedAmount,

    freshFlour: (freshFlour / totalFlour) * prefermentedAmount,
    freshHydration: (formula.outputHydration - starterHydration / totalFlour) * prefermentedAmount,

    flour: formula.flour
  };
}

// TODO WIP
export function prefermentToSimpleStage() {

}
