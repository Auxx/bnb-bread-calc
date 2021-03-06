import {
  calculatePrefermentComposition,
  calculatePrefermentWeights,
  calculatePrefermentWeightsForFlour,
  prefermentToSimpleStage,
  translatePrefermentPercentages,
  translatePrefermentRatios
} from './preferment-stage';
import { PrefermentFormula } from './preferment-stage.types';

describe('preferment-stage.ts', () => {
  describe('translatePrefermentPercentages', () => {
    it('should translate percentage values to ratios', () => {
      const result = translatePrefermentPercentages({ starterHydration: 125, outputHydration: 80, flourRatio: 9 });

      expect(result.starterHydration).toBe(1.25);
      expect(result.outputHydration).toBe(0.8);
      expect(result.flourRatio).toBe(9);
    });
  });

  describe('translatePrefermentRatios', () => {
    it('should translate ratios values to percentages', () => {
      const result = translatePrefermentRatios({ starterHydration: 1.25, outputHydration: 0.8, flourRatio: 9 });

      expect(result.starterHydration).toBe(125);
      expect(result.outputHydration).toBe(80);
      expect(result.flourRatio).toBe(9);
    });
  });

  describe('calculatePrefermentWeights', () => {
    it('should calculate weights correctly', () => {
      let result = calculatePrefermentWeights({ starterHydration: 1, outputHydration: 1, flourRatio: 2 }, 90);

      expect(result.starter).toBe(30);
      expect(result.flour).toBe(30);
      expect(result.water).toBe(30);

      result = calculatePrefermentWeights({ starterHydration: 1.5, outputHydration: 1, flourRatio: 5 }, 120);

      expect(result.starter).toBe(25);
      expect(result.flour).toBe(50);
      expect(result.water).toBe(45);
    });
  });

  describe('calculatePrefermentWeightsForFlour', () => {
    it('should calculate weights correctly', () => {
      let result = calculatePrefermentWeightsForFlour({
        starterHydration: 1,
        outputHydration: 1,
        flourRatio: 2
      }, 45);

      expect(result.starter).toBe(30);
      expect(result.flour).toBe(30);
      expect(result.water).toBe(30);

      result = calculatePrefermentWeightsForFlour({
        starterHydration: 1.5,
        outputHydration: 0.8,
        flourRatio: 5
      }, 120);

      expect(result.starter).toBe(50);
      expect(result.flour).toBe(100);
      expect(result.water).toBe(66);
    });
  });

  describe('calculatePrefermentComposition', () => {
    function expectations(formula: PrefermentFormula, prefermentedAmount) {
      const result = calculatePrefermentComposition(formula, prefermentedAmount);

      expect(result.totalFlour).toBe(prefermentedAmount);
      expect(result.totalHydration).toBe(formula.outputHydration * prefermentedAmount);
      expect(result.freshFlour + result.starterFlour).toBe(prefermentedAmount);
      expect(result.freshFlour / result.starterFlour).toBe(formula.flourRatio);
      expect(result.freshHydration + result.starterHydration).toBe(formula.outputHydration * prefermentedAmount);
    }

    it('should calculate preferment composition', () => {
      expectations({ starterHydration: 1, outputHydration: 1, flourRatio: 4 }, 1);
      expectations({ starterHydration: 1.5, outputHydration: 1, flourRatio: 9 }, 1);
      expectations({ starterHydration: 1.5, outputHydration: 1, flourRatio: 9 }, 0.5);
    });
  });

  describe('prefermentToSimpleStage', () => {
    it('should convert preferment stage into simple stage', () => {
      const result = prefermentToSimpleStage({ starterHydration: 1.5, outputHydration: 0.6, flourRatio: 4 }, 0.5);

      expect(result.flour.length).toBe(1);
      expect(result.hydration.length).toBe(1);
      expect(result.other.length).toBe(0);

      expect(result.flour[ 0 ].ratio).toBe(0.5);
      expect(result.hydration[ 0 ].ratio).toBe(0.3);
    });
  });
});
