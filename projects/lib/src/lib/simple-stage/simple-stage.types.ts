export interface SimpleStageElement {
  id: string;
  ratio: number;

  subtractFrom?: string;
  totalWeight?: number;
}

export interface SimpleStageFormula {
  flour: SimpleStageElement[];
  hydration: SimpleStageElement[];
  other: SimpleStageElement[];
  stages: SimpleStageElement[];

  id?: string;
  totalWeight?: number;
}

export interface SimpleStageComposition {
  flour: number;
  hydration: number;
  other: number;
}

export interface SimpleStageBuilderOptions {
  combineWithExisting: boolean;

  subtractFrom?: string;
}
