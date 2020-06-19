import { SimpleStageComposition, SimpleStageElement, SimpleStageFormula } from './simple-stage.types';

const ratioSum = (acc: number, i: SimpleStageElement) => acc + i.ratio;

export function calculateSimpleStageComposition(stage: SimpleStageFormula): SimpleStageComposition {
  return {
    flour: stage.flour.reduce(ratioSum, 0),
    hydration: stage.hydration.reduce(ratioSum, 0),
    other: stage.other.reduce(ratioSum, 0)
  };
}
