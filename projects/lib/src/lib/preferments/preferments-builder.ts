import { PrefermentFormula } from './preferments.types';

export class PrefermentsBuilder {
  private readonly formula: PrefermentFormula = {
    starterHydration: 1,
    outputHydration: 1,
    flourRatio: 2
  };

  static start() {
    return new PrefermentsBuilder();
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
