import { PrefermentFormula } from './preferment-stage.types';

export class PrefermentStageBuilder {
  private readonly formula: PrefermentFormula = {
    starterHydration: 1,
    outputHydration: 1,
    flourRatio: 2
  };

  constructor(formula: PrefermentFormula = null) {
    if (formula !== null) {
      Object.assign(this.formula, formula);
    }
  }

  static start(formula: PrefermentFormula = null) {
    return new PrefermentStageBuilder(formula);
  }

  starterHydration(value: number) {
    this.formula.starterHydration = value;
    return this;
  }

  outputHydration(value: number) {
    this.formula.outputHydration = value;
    return this;
  }

  flourRatio(value: number) {
    this.formula.flourRatio = value;
    return this;
  }

  flour(value: string) {
    this.formula.flour = value;
    return this;
  }

  build(): PrefermentFormula {
    return { ...this.formula };
  }
}
