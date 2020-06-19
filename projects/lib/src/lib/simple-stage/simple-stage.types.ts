export interface SimpleStageElement {
  id: string;
  ratio: number;
}

export interface SimpleStageFormula {
  flour: SimpleStageElement[];
  hydration: SimpleStageElement[];
  other: SimpleStageElement[];
}

export interface SimpleStageComposition {
  flour: number;
  hydration: number;
  other: number;
}
